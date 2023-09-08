import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/model/Product";
import { NextResponse } from "next/server";

// Handles POST requests to /api

export async function POST(request) {
  await mongooseConnect();
  const ids = request.body.ids;
  return NextResponse.json(await Product.find({ _id: ids }));
}
