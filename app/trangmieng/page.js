"use client";

import { Footer, Header, Landing } from "@/components";
import AllProducts from "@/components/AllProducts";
import SearchBar from "@/components/SearchBar";
import axios from "axios";
import { useEffect, useState } from "react";

const ProductPage = () => {
  const [productDatas, setProductDatas] = useState([]);
  const idCat = "64f3492b347e9326423be36c";
  const page = "/api/products?idCat=";
  useEffect(() => {
    axios
      .get("/api/products?idCat=" + idCat)
      .then((response) => setProductDatas(response.data));
  }, []);

  return (
    <main>
      <Header />
      <Landing />
      <SearchBar
        setProductDatas={setProductDatas}
        page={page}
        id={idCat}
        data="caphe"
      />
      <div className="mt-12">
        <AllProducts products={productDatas} />
      </div>
    </main>
  );
};

export default ProductPage;
