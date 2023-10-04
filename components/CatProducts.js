import React from "react";
import ProductCard from "./ProductCard";

const CatProducts = ({ products }) => {
  return (
    <section className="col-span-5 grid grid-cols-3 max-[768px]:col-span-4 max-[768px]:grid-cols-1 max-[1024px]:grid-cols-2 gap-8 h-fit ml-10 max-[425px]:ml-0 max-[425px]:mt-5">
      {products?.length > 0 &&
        products.map((product) => (
          <ProductCard key={product._id} {...product} />
        ))}
    </section>
  );
};

export default CatProducts;
