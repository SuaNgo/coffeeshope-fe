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
      const max = sort + 150000;

      return NextResponse.json(
        await Product.find({
          $and: [
            { category: url.searchParams.get("idCat") },
            { price: { $gte: sort, $lte: max } },
          ],
        })
      );
    } else {
      const max = sort + 1500000;
      return NextResponse.json(
        await Product.find({
          $and: [
            { category: url.searchParams.get("idCat") },
            { price: { $gte: sort, $lte: max } },
          ],
        })
      );
    }
  } else if (url.searchParams.has("idFilter", "idCat")) {
    const filter = url.searchParams.get("idFilter");
    if (filter.includes("Brand"))
      return NextResponse.json(
        await Product.find({
          $and: [
            { category: url.searchParams.get("idCat") },
            { "properties.Hãng": filter },
          ],
        })
      );
    else if (filter.includes("ml"))
      return NextResponse.json(
        await Product.find({
          $and: [
            { category: url.searchParams.get("idCat") },
            { "properties.Dung tích": filter },
          ],
        })
      );
    else if (filter.includes("g"))
      return NextResponse.json(
        await Product.find({
          $and: [
            { category: url.searchParams.get("idCat") },
            { "properties.Khối lượng": filter },
          ],
        })
      );
    else if (
      filter.includes("Đen") ||
      filter.includes("Đỏ") ||
      filter.includes("Xám")
    )
      return NextResponse.json(
        await Product.find({
          $and: [
            { category: url.searchParams.get("idCat") },
            { "properties.Màu": filter },
          ],
        })
      );
  } else if (url.searchParams.get("idCat")) {
    return NextResponse.json(
      await Product.find({ category: url.searchParams.get("idCat") })
    );
  }
}
