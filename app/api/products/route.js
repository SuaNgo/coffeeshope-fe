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
  }
  return NextResponse.json(await Product.find({}));
}
