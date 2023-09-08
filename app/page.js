"use client";

import { Content, Footer, Header, Landing } from "@/components";
import axios from "axios";

import { useEffect, useState } from "react";

export default function Home() {
  const [productDatas, setProductDatas] = useState([]);
  const [updatedDatas, setUpdateDatas] = useState(true);

  const fetch = () => {
    axios
      .get("/api/products")
      .then((response) => setProductDatas(response.data));
  };

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    if (updatedDatas) {
      fetch();
      setUpdateDatas(false);
    }
  }, [updatedDatas]);

  return (
    <main className="bg-slate-200">
      <Header />
      <Landing />
      <Content products={productDatas} />
    </main>
  );
}
