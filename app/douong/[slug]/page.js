"use client";

import { Footer, Header } from "@/components";
import SingleProduct from "@/components/SingleProduct";
import axios from "axios";
import { useEffect, useState } from "react";

const singleProductPage = ({ params }) => {
  const [productInfo, setProductInfo] = useState(null);

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
      <Footer />
    </main>
  );
};

export default singleProductPage;
