import React from "react";
import { MdClose } from "react-icons/md";
import { useState } from "react";

export const AddAddressModal = ({ addAddressFunc, submitAddress }) => {
  const [formData, setFormData] = useState({
    line1: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const { line1, city, state, postalCode } = formData;

  // Handle input fields, when some value changes
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const addressData = {
      ...formData,
    };

    submitAddress(formData);
    addAddressFunc();

    // Reset
    setFormData({
      line1: "",
      city: "",
      state: "",
      postalCode: "",
    });
  };

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="w-11/12 max-w-[350px] rounded-lg border border-secondColor bg-backgroundColor p-6">
        <div className="w-full mb-2 relative">
          <div className="flex justify-center gap-y-2 text-xl">Add Address</div>
          <button
            onClick={addAddressFunc}
            className="absolute right-0 top-1 text-xl cursor-pointer"
          >
            <MdClose />
          </button>
        </div>
        <form
          onSubmit={handleOnSubmit}
          className="flex w-full flex-col gap-y-4"
        >
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Line1 <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="line1"
              value={line1}
              onChange={handleOnChange}
              placeholder="Enter line1"
              className="w-[100%] shadow-sm shadow-shadowColor outline-none border border-yellow-100 text-sm rounded-lg p-2.5"
            />
          </label>
          <label className="w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              City <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="city"
              value={city}
              onChange={handleOnChange}
              placeholder="Enter city"
              className="w-full shadow-sm shadow-shadowColor outline-none border border-yellow-100 text-sm rounded-lg p-2.5"
            />
          </label>
          <label className="w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              State <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="state"
              value={state}
              onChange={handleOnChange}
              placeholder="Enter state"
              className="w-full shadow-sm shadow-shadowColor outline-none border border-yellow-100 text-sm rounded-lg p-2.5"
            />
          </label>
          <label className="w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              PostalCode <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="postalCode"
              value={postalCode}
              onChange={handleOnChange}
              placeholder="Enter postalCode"
              className="w-full shadow-sm shadow-shadowColor outline-none border border-yellow-100 text-sm rounded-lg p-2.5"
            />
          </label>
          <button
            type="submit"
            className="mt-6 rounded-[8px] bg-gradient-to-r from-yellow-100 via-yellow-100 to-yellow-200 py-[8px] px-[12px] font-medium text-white shadow-xl shadow-shadowColor"
          >
            Add Address
          </button>
        </form>
      </div>
    </div>
  );
};
