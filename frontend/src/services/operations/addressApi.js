import toast from "react-hot-toast"
import { addressEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";

const {
    GET_ADDRESS_API
} = addressEndpoints;


export const  getAllAddress = async (token) =>  {
    let result = []
    try {
        const response = await apiConnector("GET", GET_ADDRESS_API, null, {
        Authorization: `Bearer ${token}`,
        });
        console.log("GET_ADDRESS_API API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error(response.data.message)
        }
        result = response?.data?.address;
    } catch (error) {
        console.log("GET_ADDRESS_API API ERROR............", error)
        toast.error(error.message)
    }
    return result
}