import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/model/Order";
import { headers } from "next/headers";
const stripe = require("stripe")(process.env.STRIPE_SK);
import { NextResponse } from "next/server";

const endpointSecret =
  "whsec_fc254baac96a96b5e27b8391b9b269e5ffbf8270c4e9998a5c734a75a91396ff";

export async function POST(request) {
  await mongooseConnect();
  const sig = headers().get("stripe-signature");
  const rawBody = await request.text();
  let event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json(
      { message: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  //Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === "paid";
      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId, {
          paid: true,
        });
      }
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json(
    { message: "successfully received" },
    { status: 200 }
  );
}

//acct_1Ng6w8LcWdiXfbXA
//jovial-rapt-warm-gentle
// ("whsec_fc254baac96a96b5e27b8391b9b269e5ffbf8270c4e9998a5c734a75a91396ff");
