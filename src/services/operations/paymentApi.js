import { toast } from "react-hot-toast";
import { productPaymentEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { setPaymentLoading } from "../../slices/orderSlice";
import { clearCart } from "../../slices/cartSlice";
const RAZORPAY_KEY = "rzp_test_sB7FZPk7D9C1CB"
import {createOrder} from './orderApi'
import {resetOrderState} from '../../slices/orderSlice'



const {PRODUCT_PAYMENT_API, PRODUCT_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API} = productPaymentEndpoints;

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror= () =>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}

export async function buyCourse(token, order, userDetails, navigate, dispatch) {
    const toastId = toast.loading('Loading...');
    try {
        // load the script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res) {
            toast.error("RazorPay SDK failed to load");
            return;
        }

        // initiate the order
        const orderResponse = await apiConnector("POST", PRODUCT_PAYMENT_API, {order},
        {
        Authorization : `Bearer ${token}`,
        });
        
        if(!orderResponse) {
            throw new Error(orderResponse.data.data);
        }

        console.log("PRINTING orderResponse", orderResponse);
        //options
        const options = {
            key: RAZORPAY_KEY,
            currency: orderResponse.data.data.currency,
            amount: `${orderResponse.data.data.amount}`,
            order_id:orderResponse.data.data.id,
            name:"StudyNotion",
            description: "Thank You for Purchasing the Products",
            image:rzpLogo,
            prefill: {
                name:`${userDetails.firstName}`,
                email:userDetails.email
            },
            handler: function(response) {
                console.log(response)
                console.log(order);
                //send successful wala mail
                sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token );
                //verifyPayment
                verifyPayment({...response, order}, token, navigate, dispatch);
            }
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("Payment Failed", function(response) {
            toast.error("oops Payment Failed");
            console.log(response.error);
        })
    }catch(error) {
        console.log("PAYMENT API ERROR.....", error);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
}

export async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading('Verifying');
    dispatch(setPaymentLoading(true));
    try {
        const response = await apiConnector("POST", PRODUCT_VERIFY_API, bodyData, {Authorization : `Bearer ${token}`});

        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        const result = createOrder(token, bodyData.order);
        toast.success("payment Successful, Order Placed");
        navigate("/dashboard/orders");
        dispatch(clearCart());
        dispatch(resetOrderState());
    }catch(error) {
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}

async function sendPaymentSuccessEmail(response, amount, token) {
    try{
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
        },{
            Authorization: `Bearer ${token}`
        })
    }
    catch(error) {
        console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
    }
}