"use client";

import { Footer, Header, Landing } from "@/components";
import AllProducts from "@/components/AllProducts";
import axios from "axios";
import { useEffect, useState } from "react";

const ProductPage = () => {
  const [productDatas, setProductDatas] = useState([]);
  useEffect(() => {
    axios
      .get("/api/products")
      .then((response) => setProductDatas(response.data));
  }, []);

  return (
    <main className="bg-slate-200">
      <Header />
      <Landing />
      <AllProducts products={productDatas} />
    </main>
  );
};

export default ProductPage;
