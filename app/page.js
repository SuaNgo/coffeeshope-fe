"use client";

import { Content, Footer, Header, Landing } from "@/components";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [productDatas, setProductDatas] = useState([]);

  useEffect(() => {
    axios
      .get("/api/contents")
      .then((response) => setProductDatas(response.data));
  }, []);

  return (
    <main className="bg-slate-200">
      <Header />
      <Landing />
      <Content products={productDatas} />
    </main>
  );
}
