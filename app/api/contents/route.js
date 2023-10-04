import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/model/Product";
import { NextResponse } from "next/server";

// Handles POST requests to /api

export async function GET(request) {
  await mongooseConnect();
  const url = new URL(request.url);

  if (url.searchParams.has("related")) {
    return NextResponse.json(
      await Product.aggregate([{ $sample: { size: 4 } }])
    );
  }

  return NextResponse.json(
    await Product.find({ discount: { $exists: true, $ne: null } }).limit(4)
  );
}
