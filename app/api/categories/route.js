import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/model/Category";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request) {
  // const check = await getServerSession(authOptions);
  // if (!check) {
  //   return NextResponse.json("Not admin");
  // } else {
  await mongooseConnect();
  const url = new URL(request.url);
  if (url.searchParams.get("id")) {
    return NextResponse.json(
      await Category.findById(url.searchParams.get("id"))
    );
  }

  return NextResponse.json(await Category.find().populate("parentCategory"));
}
