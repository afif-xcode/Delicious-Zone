import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { MdNavigateNext } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAddress,
  addAddress,
} from "../../../../../../../services/operations/addressApi";

import { setOrder, setStep } from "../../../../../../../slices/orderSlice";
import IconBtn from "../../../../../../common/IconBtn";
import { AddAddressModal } from "./AddAddressModal";

export default function CourseBuilderhtmlForm() {
  const { order } = useSelector((state) => state.order);
  const { token } = useSelector((state) => state.auth);
  const [address, setAddress] = useState([]);
  const [addressId, setAddressId] = useState(null);
  const [addAddressModal, setAddAddressModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await getAllAddress(token);
        setAddress(res);
      } catch (error) {
        console.log(error);
        console.log("Could not fetch address");
      }
      setLoading(false);
    })();
  }, []);

  // handle htmlForm submission
  const handleSelectAddress = (e) => {
    setAddressId(e.target.value);
  };

  const goToNext = () => {
    if (!addressId) return toast.error("Please select address");
    const orderData = {
      products: order.products,
      totalAmount: order.totalAmount,
      shippingAddress: addressId,
      paymentMod: null,
    };
    setLoading(true);
    dispatch(setStep(3));
    dispatch(setOrder(orderData));
    setLoading(false);
  };

  const goBack = () => {
    dispatch(setStep(1));
  };

  const addAddressFunc = () => {
    if (addAddressModal === true) {
      setAddAddressModal(false);
    } else {
      setAddAddressModal(true);
    }
  };

  const submitAddress = async (formData) => {
    setLoading(true);
    try {
      const res = await addAddress(token, formData);
      const responce = await getAllAddress(token);
      setAddress(responce);
    } catch (error) {
      console.log(error);
      console.log("Could not add address");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8 rounded-md border-[1px] w-full border-shadowColor bg-white p-6">
      <div className="flex justify-between">
        <p className="text-2xl font-semibold text-richblack-5">Address</p>
        <IconBtn disabled={loading} text="Add Address" onclick={addAddressFunc}>
          <IoAdd />
        </IconBtn>
      </div>
      <div>
        <ul className="flex flex-col w-full gap-6">
          {address.map((a, i) => (
            <li key={a._id} onClick={handleSelectAddress}>
              <input
                type="radio"
                id="address"
                name="hosting"
                value={a._id}
                className="hidden peer"
                required
              />
              <label
                htmlFor="address"
                className="inline-flex flex-col justify-center gap-y-1 w-full p-5 text-black bg-shadowColor bg-opacity-10 border border-shadowColor rounded-lg cursor-pointer peer-checked:border-primaryColor peer-checked:text-primaryColor peer-checked:bg-opacity-20 hover:text-gray-600 hover:bg-gray-100"
              >
                <h2 className="text-primaryColor">Address : {i + 1}</h2>
                <div className="block">
                  <p className="w-full text-lg font-semibold">
                    {a.user.firstName} {a.user.lastName}
                  </p>
                  <p className="w-full">
                    {a.city},{a.line1}
                  </p>
                  <p className="w-full">{a.postalCode}</p>
                  <p className="w-full">{a.state}</p>
                </div>
              </label>
            </li>
          ))}
        </ul>
        {address.length === 0 && (
          <p className="flex justify-center">No Address</p>
        )}
      </div>

      {/* Next Prev Button */}
      <div className="flex justify-end gap-x-3">
        <button
          onClick={goBack}
          className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
        >
          Back
        </button>
        <IconBtn disabled={loading} text="Next" onclick={goToNext}>
          <MdNavigateNext />
        </IconBtn>
      </div>
      {addAddressModal === true && (
        <AddAddressModal
          addAddressFunc={addAddressFunc}
          submitAddress={submitAddress}
        />
      )}
    </div>
  );
}
