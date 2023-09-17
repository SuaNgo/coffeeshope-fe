"use client";

import { Footer, Header, Landing } from "@/components";

import CatProducts from "@/components/CatProducts";
import CustomFilter from "@/components/CustomFilter";
import SearchBar from "@/components/SearchBar";
import axios from "axios";
import { useEffect, useState } from "react";

const ProductPage = () => {
  const [productDatas, setProductDatas] = useState([]);
  const [filter, setFilter] = useState([]);
  const idCat = "64f348d3347e9326423be344";
  const page = "/api/products?idCat=";
  useEffect(() => {
    axios
      .get("/api/products?idCat=" + idCat)
      .then((response) => setProductDatas(response.data));
  }, []);
  useEffect(() => {
    axios
      .get("/api/categories?id=" + idCat)
      .then((response) => response.data)
      .then((data) => {
        const props = data.properties.map((p) => p.values);
        setFilter(props);
      });
  }, []);
  return (
    <main>
      <Header />
      <Landing />
      <SearchBar setProductDatas={setProductDatas} page={page} id={idCat} />
      <div className="grid grid-cols-6 mt-12">
        <CustomFilter
          setProductDatas={setProductDatas}
          filter={filter}
          id={idCat}
          data="maycaphe"
        />
        <CatProducts products={productDatas} />
      </div>
    </main>
  );
};

export default ProductPage;
