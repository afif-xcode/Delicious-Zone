import React from "react";

export default function Product({ imageurl, name, price, description }) {
  return (
    <div className="shadow-[0_4px_8px_0_rgba(0,0,0,0.2)] max-w-xs text-center mx-4 my-auto">
      <img
        className="w-full h-[16em] object-cover"
        src={imageurl}
        alt="product image"
      />
      <h2>{name}</h2>
      <p className="text-[grey] text-[22px]">{price}</p>
      <p>{description}</p>
      <p>
        <button className="outline-none p-3 text-white bg-black text-center cursor-pointer w-full text-lg">
          Add to Cart
        </button>
      </p>
    </div>
  );
}
