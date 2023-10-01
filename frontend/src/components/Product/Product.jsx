import React from "react";

export default function Product({ imageurl, name, price, description }) {
  return (
    <div className="shadow-[2px_4px_8px_2px_shadowColor] max-w-xs text-center mx-4 my-auto">
      <img
        className="w-[300px] h-[250px] object-cover rounded-md"
        src={imageurl}
        alt="product image"
      />
      <h2>{name}</h2>
      <p className="text-[grey] text-[22px]">{price}</p>
      <p>{description}</p>

      <button className="outline-none p-3 bg-primaryColor text-center cursor-pointer w-full text-lg flex justify-center border border-shadowColor items-center gap-x-2 shadow-lg shadow-shadowColor px-[20px] py-[10px] text-white rounded-md">
        Add to Cart
      </button>
    </div>
  );
}
