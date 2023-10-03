import React from "react";
import toast from "react-hot-toast";
import {useDispatch, useSelector} from "react-redux"

import {addToCart} from '../../slices/cartSlice'
import { useNavigate } from "react-router-dom";

export default function Product({product}) {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if(token === null) {
      toast.error("Login to Your Account");
      navigate('/login')
      return;
    }
    dispatch(addToCart(product))
  }
  return (
    <div className="flex flex-col gap-y-2 rounded-md items-center justify-center">
      <img
        className="w-[300px] h-[250px] object-cover rounded-t-md"
        src={product.thumbnail.image_link}
        alt="product image"
      />
      <h2 className="text-lg text-center font-bold">{product.productName}</h2>
      <p>{product.description}</p>

      <div className="flex justify-around">
        <p className="text-[grey] text-[22px]">{product.price}</p>
        <button 
          className="outline-none flex items-center p-3 rounded-[8px] bg-gradient-to-r from-yellow-100 to-yellow-200 text-white shadow-lg font-medium shadow-shadowColor cursor-pointer gap-x-2 py-2 px-5"
          onClick={handleAddToCart}
          >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
