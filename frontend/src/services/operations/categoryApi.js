import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { categoryEndpoints } from "../apis"

const {
    PRODUCT_CATEGORY_API
} = categoryEndpoints;

export const fetchProductCategories = async () => {
    let result = []
    try {
        const response = await apiConnector("GET", PRODUCT_CATEGORY_API);
        console.log("PRODUCT_CATEGORY_API API RESPONSE............", response)
        if (!response?.data?.success) {
        throw new Error("Could Not Fetch Product Categories")
        }
        result = response?.data?.data;
    } catch (error) {
        console.log("PRODUCT_CATEGORY_API API ERROR............", error)
        toast.error(error.message)
    }
    return result
}