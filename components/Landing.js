import React from "react";

const Landing = () => {
  return (
    <section className="bg-homepage bg-cover w-full h-[700px] max-[1024px]:h-[800px]">
      <div className="flex items-center h-[550px]">
        <div>
          <h1 className="font-title text-white font-bold text-[40px] ml-[40px] max-[1024px]:text-[30px] mb-4">
            Start your day with <br /> a black coffee
          </h1>
          <button className="font-title py-1 px-3 bg-white rounded-full text-[16px] ml-[40px] max-[1024px]:text-[16px]">
            More details
          </button>
        </div>
      </div>
    </section>
  );
};

export default Landing;