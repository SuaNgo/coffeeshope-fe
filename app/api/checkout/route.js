import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/model/Product";
import { Order } from "@/model/Order";
import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SK);

export async function POST(request) {
  await mongooseConnect();

  const res = await request.json();

  const {
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    ids,
    cartProp,
    total,
  } = res;

  const productsIds = ids;
  const uniqueIds = [...new Set(productsIds)];
  const productsInfos = await Product.find({ _id: uniqueIds });

  let line_items = [];
  for (const productId of uniqueIds) {
    const productInfo = productsInfos.find(
      (p) => p._id.toString() === productId
    );

    const quantity = 1;
    if (quantity > 0 && productInfo) {
      line_items.push({
        quantity,

        price_data: {
          currency: "VND",
          product_data: {
            name: productInfo.product,
            description: cartProp.toString(),
          },

          unit_amount: total,
        },
      });
    }
  }

  const orderDoc = await Order.create({
    line_items,
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    paid: false,
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    customer_email: email,
    success_url: process.env.PUBLIC_URL + "/order?success=1",
    cancel_url: process.env.PUBLIC_URL + "/order?canceled=1",
    metadata: {
      orderId: orderDoc._id.toString(),
      test: "ok",
    },
  });

  return NextResponse.json({
    url: session.url,
  });
}
