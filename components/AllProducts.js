import React from "react";
import ProductCard from "./ProductCard";

const AllProducts = ({ products }) => {
  return (
    <section className="grid grid-cols-4 max-[425px]:grid-cols-1 max-[768px]:grid-cols-2 max-[1024px]:grid-cols-3 gap-4 h-fit">
      {products?.length > 0 &&
        products.map((product) => (
          <ProductCard key={product._id} {...product} />
        ))}
    </section>
  );
};

export default AllProducts;
