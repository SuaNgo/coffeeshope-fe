import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/model/Product";
import { NextResponse } from "next/server";

// Handles POST requests to /api

export async function GET(request) {
  await mongooseConnect();
  const url = new URL(request.url);
  return NextResponse.json(
    await Product.find({ category: url.searchParams.get("id") }).limit(2)
  );
}
