import React from "react";
import ProductCard from "./ProductCard";

const Content = ({ products }) => {
  return (
    <section className=" h-fit grid grid-cols-4 max-[425px]:grid-cols-1 max-[768px]:grid-cols-2 max-[1024px]:grid-cols-3 gap-4">
      {products?.length > 0 &&
        products.map((product) => (
          <ProductCard key={product._id} {...product} />
        ))}
    </section>
  );
};

export default Content;
