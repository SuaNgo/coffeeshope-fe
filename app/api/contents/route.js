import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/model/Product";
import { NextResponse } from "next/server";

// Handles POST requests to /api

export async function GET(request) {
  await mongooseConnect();

  return NextResponse.json(
    await Product.find({}, null, { sort: { _id: -1 }, limit: 5 })
  );
}
