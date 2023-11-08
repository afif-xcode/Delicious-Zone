import toast from "react-hot-toast"
import { productEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";

const {
    GET_ALL_PRODUCTS_API,
    ADD_PRODUCT_API,
    DELETE_PRODUCT_API
} = productEndpoints;


export const  getAllProducts = async () =>  {
    let result = []
    try {
        const response = await apiConnector("GET", GET_ALL_PRODUCTS_API);
        console.log("GET_ALL_PRODUCTS_API API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error(response.data.message)
        }
        result = response?.data?.products;
    } catch (error) {
        console.log("GET_ALL_PRODUCTS_API API ERROR............", error)
        toast.error(error.message)
    }
    return result
}

// add the Product details
export const addProduct = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", ADD_PRODUCT_API, data, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      })
      console.log("CREATE PRODUCT API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Add Product Details")
      }
      toast.success("Product Added Successfully")
      result = response?.data;
    } catch (error) {
      console.log("CREATE PRODUCT API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

// delete a Product
export const deleteProduct = async (data, token) => {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("DELETE", DELETE_PRODUCT_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE PRODUCT API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Product")
    }
    toast.success("Product Deleted")
  } catch (error) {
    console.log("DELETE PRODUCT API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
}