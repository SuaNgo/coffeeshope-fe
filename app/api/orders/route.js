import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/model/Product";
import { NextResponse } from "next/server";

// Handles POST requests to /api

export async function POST(request) {
  await mongooseConnect();
  const res = await request.json();
  const { ids } = res;
  return NextResponse.json(await Product.find({ _id: ids }));
}
