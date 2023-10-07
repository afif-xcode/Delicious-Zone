import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { orderEndpoints } from "../apis"

const {
    CREATE_ORDER_API,
    UPDATE_ORDER_STATUS_API,
    GET_ORDER_DETAILS_API,
    GET_ALL_ORDERS_API,
    GET_ADMIN_ORDERS_API
} = orderEndpoints

// get all order of customer
export const  getAllOrder = async (token) =>  {
    let result = null;
    try {
        const response = await apiConnector("GET", GET_ALL_ORDERS_API,  null, {
            Authorization: `Bearer ${token}`,
          });
        console.log("GET_ALL_ORDERS_API API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error(response.data.message)
        }
        result = response?.data?.orders;
    } catch (error) {
        console.log("GET_ALL_ORDERS_API API ERROR............", error)
        toast.error(error.message)
    }
    return result
}

// get all order of admin 
export const  getAllOrderAdmin = async (token) =>  {
    let result = null;
    try {
        const response = await apiConnector("GET", GET_ADMIN_ORDERS_API, null, {
            Authorization: `Bearer ${token}`,
          });
        console.log("GET_ADMIN_ORDERS_API API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error(response.data.message)
        }
        result = response?.data?.orders;
    } catch (error) {
        console.log("GET_ADMIN_ORDERS_API API ERROR............", error)
        toast.error(error.message)
    }
    return result
}

// update order status 
export const  updateOrderStatus = async (token, formData) => {
    const toastId = toast.loading("Loading...")
    let result = false;
    try {
        const response = await apiConnector("PUT", UPDATE_ORDER_STATUS_API, formData, {
        Authorization: `Bearer ${token}`,
        })
        console.log("UPDATE_ORDER_STATUS_API API RESPONSE............", response)

        if (!response.data.success) {
        throw new Error(response.data.message)
        }
        toast.dismiss(toastId)
        toast.success("Status Updated Successfully")
        result = true;
    } catch (error) {
        console.log("UPDATE_ORDER_STATUS_API API ERROR............", error)
        toast.dismiss(toastId)
        toast.error("Could Not Update Status")
    }
    return result;
}

// get all order of admin 
export const  getOrderDetails = async (token, orderId) =>  {
    let result = null;
    try {
        const response = await apiConnector("POST", GET_ORDER_DETAILS_API, {orderId}, {
            Authorization: `Bearer ${token}`,
        })
        console.log("GET_ORDER_DETAILS_API API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error(response.data.message)
        }
        result = response?.data?.data;
    } catch (error) {
        console.log("GET_ORDER_DETAILS_API API ERROR............", error)
        toast.error(error.message)
    }
    return result
}