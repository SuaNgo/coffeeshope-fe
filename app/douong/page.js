"use client";

import { Footer, Header, Landing } from "@/components";
import AllProducts from "@/components/AllProducts";
import SearchBar from "@/components/SearchBar";
import axios from "axios";
import { useEffect, useState } from "react";

const ProductPage = () => {
  const [productDatas, setProductDatas] = useState([]);
  const idCat = "64f34900347e9326423be35c";
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
      <SearchBar setProductDatas={setProductDatas} page={page} id={idCat} />
      <div className="mt-12">
        <AllProducts products={productDatas} />
      </div>
      <Footer />
    </main>
  );
};

export default ProductPage;
