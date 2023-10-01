const BASE_URL =  "http://localhost:4000/api/v1"

// CATEGORY ENDPOINTS
export const categoryEndpoints = {
    PRODUCT_CATEGORY_API : BASE_URL + "/category/showAllCategories",
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