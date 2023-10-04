"use client";

import axios from "axios";
import { useState } from "react";

const SearchBar = ({ setProductDatas, page, id }) => {
  const [input, setInput] = useState("");
  const newId = id ? id : "";
  const fetchData = (value) => {
    axios
      .get(page + newId)
      .then((response) => response.data)
      .then((data) => {
        const results = data.filter((user) => {
          return (
            user.product &&
            user.product.toLowerCase().includes(value.toLowerCase())
          );
        });
        setProductDatas(results);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="ml-8">
      <h1 className="text-[30px] font-title mb-2">Tìm kiếm sản phẩm</h1>
      <input
        className="p-4 border-2 solid w-[400px] max-[425px]:w-full rounded-full bg-transparent  focus:outline-none focus:ring-0"
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
