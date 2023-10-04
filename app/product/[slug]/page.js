"use client";

import { Footer, Header } from "@/components";
import AllProducts from "@/components/AllProducts";
import RelatedProducts from "@/components/RelatedProducts";
import SingleProduct from "@/components/SingleProduct";
import axios from "axios";
import { useEffect, useState } from "react";

const singleProductPage = ({ params }) => {
  const [productInfo, setProductInfo] = useState(null);
  const [relatedDatas, setRelatedDatas] = useState([]);

  useEffect(() => {
    axios
      .get("/api/contents?related")
      .then((response) => setRelatedDatas(response.data));
  }, []);
  const { slug } = params;
  useEffect(() => {
    if (!slug) {
      return;
    }
    axios.get("/api/products?id=" + slug).then((response) => {
      setProductInfo(response.data);
    });
  }, [slug]);

  return (
    <main className="h-full">
      <Header />

      {productInfo && <SingleProduct {...productInfo} />}
      <div className="mx-12">
        <h1 className="text-[40px] leading-10 font-title font-semibold mt-2 mb-8 max-[1024px]:mt-20">
          Một số sản phẩm khác
        </h1>
        <RelatedProducts products={relatedDatas} />
      </div>

      <Footer />
    </main>
  );
};

export default singleProductPage;
