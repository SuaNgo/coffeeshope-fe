import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/model/Product";
import { NextResponse } from "next/server";

// Handles POST requests to /api

export async function GET(request) {
  await mongooseConnect();
  const url = new URL(request.url);

  if (url.searchParams.get("id")) {
    return NextResponse.json(
      await Product.findById(url.searchParams.get("id"))
    );
  } else if (url.searchParams.has("idSort", "idCat")) {
    const sort = Number(url.searchParams.get("idSort"));

    if (sort < 1000000) {
      const max = sort + 250000;

      return NextResponse.json(
        await Product.find({
          $and: [
            { category: url.searchParams.get("idCat") },
            { price: { $gte: sort, $lte: max } },
          ],
        })
      );
    }
  } else if (url.searchParams.get("idCat")) {
    return NextResponse.json(
      await Product.find({ category: url.searchParams.get("idCat") })
    );
  }
}
