import React from "react";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link, matchPath, useLocation } from "react-router-dom";

export const CartPopUp = () => {
  const { cart } = useSelector((state) => state.cart);
  const totalItems = cart.length;
  return (
    <div className="sticky bottom-8 grid place-items-center">
      <div className="w-6/12 rounded-lg border border-secondColor bg-backgroundColor p-6">
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <AiOutlineShoppingCart className="text-xl" />
            {totalItems} items added in your cart
          </div>
          <div>
            <Link
              to="/dashboard/cart"
              className="flex items-center rounded-[8px] bg-gradient-to-r from-yellow-100 to-yellow-200 text-white shadow-lg font-medium shadow-shadowColor cursor-pointer gap-x-2 py-2 px-5 "
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
