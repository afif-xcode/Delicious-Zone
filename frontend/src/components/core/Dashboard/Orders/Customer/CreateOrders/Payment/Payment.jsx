import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../../../../../common/IconBtn";
import { createOrder } from "../../../../../../../services/operations/orderApi";
import { buyCourse } from "../../../../../../../services/operations/paymentApi";
import { setStep } from "../../../../../../../slices/orderSlice";

import { resetOrderState } from "../../../../../../../slices/orderSlice";
import { clearCart } from "../../../../../../../slices/cartSlice";
import toast from "react-hot-toast";

export default function Payment() {
  const { order } = useSelector((state) => state.order);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [paymentMod, setPaymentMod] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goBack = () => {
    dispatch(setStep(2));
  };

  const handleOrderPlace = () => {
    console.log(paymentMod);
    const orderData = {
      products: order.products,
      totalAmount: order.totalAmount,
      shippingAddress: order.shippingAddress,
      paymentMod: paymentMod,
    };

    const formData = orderData;
    console.log(formData);
    if (paymentMod === "COD") {
      const result = createOrder(token, formData);
      if (result) {
        dispatch(clearCart());
        dispatch(resetOrderState());
        navigate("/dashboard/orders");
      } else {
        toast("Order could not Placed ");
        navigate("/dashboard/cart");
      }
    } else {
      buyCourse(token, formData, user, navigate, dispatch);
    }
  };

  return (
    <div className="rounded-md border-[1px] border-shadowColor bg-white p-6">
      <p className="text-2xl font-semibold text-richblack-5">Payment</p>
      <div>
        {/* Checkbox */}
        <ul className="items-center w-full text-sm font-medium my-10 text-black bg-shadowColor bg-opacity-30 border border-primaryColor rounded-lg sm:flex">
          <li
            onClick={() => setPaymentMod("COD")}
            className="w-full border-b border-primaryColor sm:border-b-0 sm:border-r"
          >
            <div className="flex items-center pl-3">
              <input
                id="payment-cod"
                type="radio"
                value=""
                name="list-radio"
                className="w-4 h-4 text-primaryColo"
              />
              <label
                htmlFor="payment-cod"
                className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Cash on Delivery{" "}
              </label>
            </div>
          </li>
          <li
            onClick={() => setPaymentMod("Online")}
            className="w-full border-b border-primaryColor sm:border-b-0"
          >
            <div className="flex items-center pl-3">
              <input
                id="payment-online"
                type="radio"
                value=""
                name="list-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
              />
              <label
                htmlFor="payment-online"
                className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Online Payment
              </label>
            </div>
          </li>
        </ul>

        {/* Next Prev Button */}
        <div className="ml-auto flex max-w-max items-center gap-x-4">
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
          >
            Back
          </button>
          <IconBtn
            disabled={loading}
            text="Place Order"
            onclick={handleOrderPlace}
          />
        </div>
      </div>
    </div>
  );
}
