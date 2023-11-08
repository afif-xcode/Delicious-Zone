import { combineReducers } from "@reduxjs/toolkit"

import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice"
import cartReducer from "../slices/cartSlice"
import orderReducer from "../slices/orderSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  cart : cartReducer,
  order : orderReducer,
})

export default rootReducer
