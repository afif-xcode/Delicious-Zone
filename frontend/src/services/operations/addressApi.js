import toast from "react-hot-toast";
import { addressEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";

const { GET_ADDRESS_API, ADD_ADDRESS_API } = addressEndpoints;

export const getAllAddress = async (token) => {
  let result = [];
  try {
    const response = await apiConnector("GET", GET_ADDRESS_API, null, {
      Authorization: `Bearer ${token}`,
    });
    console.log("GET_ADDRESS_API API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error(response.data.message);
    }
    result = response?.data?.address;
  } catch (error) {
    console.log("GET_ADDRESS_API API ERROR............", error);
    toast.error(error.message);
  }
  return result;
};

export const addAddress = async (token, data) => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector("POST", ADD_ADDRESS_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("ADD_ADDRESS_API API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error(response.data.message);
    }
    result = response?.data?.address;
    toast.success("success");
  } catch (error) {
    console.log("ADD_ADDRESS_API API ERROR............", error);
    toast.error(error.message);
    toast.success("Could not add adress");
  }
  toast.dismiss(toastId);
  return result;
};
