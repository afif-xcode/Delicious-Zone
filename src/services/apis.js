const BASE_URL =  "https://delicious-zone.onrender.com"

// CATEGORY ENDPOINTS
export const categoryEndpoints = {
    PRODUCT_CATEGORY_API : BASE_URL + "/category/showAllCategories",
    GET_CATEGORY_PAGE_DETAILS_API : BASE_URL + "/category/getCategoryPageDetails"
}

// AUTH ENDPOINTS
export const authEndpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
}

// SETTING ENDPOINTS
export const settingEndpoints = {
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
}

// PRODUCT ENDPOINTS
export const productEndpoints = {
    GET_ALL_PRODUCTS_API: BASE_URL + "/products/getAllProduct",
    ADD_PRODUCT_API : BASE_URL + "/products/createProduct",
    DELETE_PRODUCT_API : BASE_URL + "/products/deleteProduct"
}

// ORDERS ENDPOINTS 
export const orderEndpoints = {
    CREATE_ORDER_API : BASE_URL + "/order/creatOrder",
    UPDATE_ORDER_STATUS_API : BASE_URL + "/order/updateOrderStatus",
    GET_ORDER_DETAILS_API : BASE_URL + "/order/getOrder",
    GET_ALL_ORDERS_API : BASE_URL + "/order/getAllOrders",
    GET_ADMIN_ORDERS_API : BASE_URL + "/order/admin/Orders"
}

// ORDERS ADDRESS 
export const addressEndpoints = {
    GET_ADDRESS_API : BASE_URL + "/address/getAllAddress",
}

// PAYMENT ENDPOINTS
export const productPaymentEndpoints = {
    PRODUCT_PAYMENT_API: BASE_URL + "/payment/capturePayment",
    PRODUCT_VERIFY_API: BASE_URL + "/payment/verifyPayment",
    SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
  }
  