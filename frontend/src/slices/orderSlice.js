import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  step: 1,
  order : null,
  paymentLoading: false,
}

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload
    },
    setOrder: (state, action) => {
      state.order = action.payload
    },
    setPaymentLoading: (state, action) => {
      state.paymentLoading = action.payload
    },
    resetCourseState: (state) => {
      state.step = 1
      state.order = null
    },
  },
})

export const {
  setStep,
  setOrder,
  setPaymentLoading,
  resetCourseState,
} = orderSlice.actions

export default orderSlice.reducer
