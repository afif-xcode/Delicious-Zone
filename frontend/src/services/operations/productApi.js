import toast from "react-hot-toast"
import { productEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";

const {
    GET_ALL_PRODUCTS_API
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