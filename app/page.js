"use client";

import { Content, Footer, Header, Landing } from "@/components";
import Carousel from "@/components/Carousel";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [productDatas, setProductDatas] = useState([]);
  const [desertDatas, setDesertDatas] = useState([]);
  const [drinkDatas, setDrinkDatas] = useState([]);

  const images = [
    "/test1.webp",
    "/test2.webp",
    "/test3.webp",
    "/test4.webp",
    "/test5.webp",
  ];
  const drink = "64f34900347e9326423be35c";
  const desert = "64f3492b347e9326423be36c";
  useEffect(() => {
    axios
      .get("/api/contents")
      .then((response) => setProductDatas(response.data));
  }, []);

  useEffect(() => {
    axios
      .get("/api/drink?id=" + drink)
      .then((response) => setDrinkDatas(response.data));
  }, []);

  useEffect(() => {
    axios
      .get("/api/desert?id=" + desert)
      .then((response) => setDesertDatas(response.data));
  }, []);

  return (
    <main className="">
      <Header />
      {/* <Landing /> */}
      <Carousel images={images} />
      <Content
        products={productDatas}
        drink={drinkDatas}
        desert={desertDatas}
      />
      <Footer />
    </main>
  );
}
