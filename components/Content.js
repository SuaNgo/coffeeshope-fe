import React from "react";
import ProductCard from "./ProductCard";

const Content = ({ products, desert, drink }) => {
  return (
    <section className="mt-10 h-full ">
      <div className="mb-20">
        <h1 className="text-center text-[40px] font-title mb-10">
          Sản phẩm nổi bật
        </h1>
        <div className=" h-fit grid grid-cols-4 max-[425px]:grid-cols-1 max-[768px]:grid-cols-2 max-[1024px]:grid-cols-3">
          {products?.length > 0 &&
            products.map((product) => (
              <ProductCard key={product._id} {...product} />
            ))}
        </div>
      </div>
      <div className="mb-20 mt-10">
        <div className=" h-fit grid grid-cols-4 max-[425px]:grid-cols-1 max-[768px]:grid-cols-2 max-[1024px]:grid-cols-3">
          <div className="col-span-2 h-[300px] mx-8 rounded-xl">
            <img src="/sanphamnoibat.webp" className="rounded-xl" />
          </div>
          {desert?.length > 0 &&
            desert.map((d) => <ProductCard key={d._id} {...d} />)}
        </div>
      </div>
      <div>
        <div className=" h-fit grid grid-cols-4 max-[425px]:grid-cols-1 max-[768px]:grid-cols-2 max-[1024px]:grid-cols-3">
          {drink?.length > 0 &&
            drink.map((d) => <ProductCard key={d._id} {...d} />)}
        </div>
      </div>
    </section>
  );
};

export default Content;
