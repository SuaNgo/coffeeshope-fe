"use client";

import { Footer, Header, Landing } from "@/components";
import AllProducts from "@/components/AllProducts";
import CatProducts from "@/components/CatProducts";
import CustomFilter from "@/components/CustomFilter";
import SearchBar from "@/components/SearchBar";
import axios from "axios";
import { useEffect, useState } from "react";

const ProductPage = () => {
  const [productDatas, setProductDatas] = useState([]);
  const [filter, setFilter] = useState([]);
  const idCat = "64f3485e347e9326423be33c";

  const page = "/api/products?idCat=";
  useEffect(() => {
    axios
      .get("/api/products?idCat=" + idCat)
      .then((response) => setProductDatas(response.data));
  }, []);
  // useEffect(() => {
  //   axios
  //     .get("/api/categories?id=" + idCat)
  //     .then((response) => response.data)
  //     .then((data) => {
  //       const props = data.properties.map((p) => p.values);
  //       setFilter(props);
  //     });
  // }, []);

  return (
    <main className="">
      <Header />
      <Landing />
      <SearchBar setProductDatas={setProductDatas} page={page} id={idCat} />
      <div className="grid grid-cols-6 mt-12">
        <CustomFilter
          setProductDatas={setProductDatas}
          // filter={filter}
          id={idCat}
          data="caphe"
        />
        <CatProducts products={productDatas} />
      </div>
      <Footer />
    </main>
  );
};

export default ProductPage;
