"use client";

import axios from "axios";
import { useState } from "react";

const CustomFilter = ({ setProductDatas, filter, id, data }) => {
  // const [selected, setSelected] = useState(null);
  const [sort, setSort] = useState(null);
  // const propArr = filter
  //   ?.map((f) => f.split(","))
  //   .join(",")
  //   .split(",");
  // const handleChange = (index, e, id) => {
  //   setSelected((prev) => (index === prev ? null : index));
  //   if (selected !== index) {
  //     axios
  //       .get("/api/products?idCat=" + id + "&idFilter=" + e)
  //       .then((response) => response.data)
  //       .then((data) => {
  //         setProductDatas(data);
  //       });
  //   } else {
  //     axios
  //       .get("/api/products?idCat=" + id)
  //       .then((response) => response.data)
  //       .then((data) => {
  //         setProductDatas(data);
  //       });
  //   }
  // };
  const handleSort = (index, e, id) => {
    setSort((prev) => (index === prev ? null : index));
    if (sort !== index) {
      axios
        .get("/api/products?idCat=" + id + "&idSort=" + e)
        .then((response) => response.data)
        .then((data) => {
          setProductDatas(data);
        });
    } else {
      axios
        .get("/api/products?idCat=" + id)
        .then((response) => response.data)
        .then((data) => {
          setProductDatas(data);
        });
    }
  };

  let priceMin = 0;
  let step = 0;

  if (data === "caphe") {
    priceMin = 50000;
    step = 150000;
  } else if (data === "maycaphe") {
    priceMin = 2500000;
    step = 1500000;
  }

  return (
    <form className="flex flex-col col-span-1 ml-8 text-[16px]">
      {/* <h1 className="text-[20px]">Kiểu dáng</h1>
      {propArr?.map((f, index) => (
        <>
          <label
            key={index}
            className="flex flex-row items-baseline justify-between"
          >
            <div className="flex flex-row items-baseline gap-3">
              <input
                key={f}
                type="checkbox"
                value={f}
                checked={index === selected}
                onChange={(e) => handleChange(index, e.target.value, id)}
              />
              <span key={index + f}>{f}</span>
            </div>
          </label>
        </>
      ))} */}
      <h1 className="text-[20px]">Giá</h1>
      <label className="flex flex-row items-baseline justify-between">
        <div className="flex flex-row items-baseline gap-3">
          <input
            id="sort1"
            type="checkbox"
            value={priceMin}
            checked={sort === "sort1"}
            onChange={(e) => handleSort("sort1", e.target.value, id)}
          />
          <span>
            {priceMin}
            {"~"}
            {priceMin + step}
          </span>
        </div>
      </label>

      <label className="flex flex-row items-baseline justify-between">
        <div className="flex flex-row items-baseline gap-3">
          <input
            id="sort2"
            type="checkbox"
            value={priceMin + step}
            checked={sort === "sort2"}
            onChange={(e) => handleSort("sort2", e.target.value, id)}
          />
          <span>
            {priceMin + step}
            {"~"}
            {priceMin + 2 * step}
          </span>
        </div>
      </label>
      <label className="flex flex-row items-baseline justify-between">
        <div className="flex flex-row items-baseline gap-3">
          <input
            id="sort3"
            type="checkbox"
            value={priceMin + 2 * step}
            checked={sort === "sort3"}
            onChange={(e) => handleSort("sort3", e.target.value, id)}
          />
          <span>Trên {priceMin + 2 * step}</span>
        </div>
      </label>
    </form>
  );
};

export default CustomFilter;
