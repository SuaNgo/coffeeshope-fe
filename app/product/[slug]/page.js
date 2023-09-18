"use client";

import { Footer, Header } from "@/components";
import AllProducts from "@/components/AllProducts";
import SingleProduct from "@/components/SingleProduct";
import axios from "axios";
import { useEffect, useState } from "react";

const singleProductPage = ({ params }) => {
  const [productInfo, setProductInfo] = useState(null);
  const [productDatas, setProductDatas] = useState([]);
  const idCat = "64f3485e347e9326423be33c";
  useEffect(() => {
    axios
      .get("/api/products?idCat=" + idCat)
      .then((response) => setProductDatas(response.data));
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
    <main className="bg-slate-200 h-full">
      <Header />

      {productInfo && <SingleProduct {...productInfo} />}
      <AllProducts products={productDatas} />
      <Footer />
    </main>
  );
};

export default singleProductPage;
