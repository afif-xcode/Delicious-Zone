import {createSlice} from "@reduxjs/toolkit"
import toast from "react-hot-toast"

const initialState = {
    cart : localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
}

const cartSlice = createSlice({
    name : "cart",
    initialState,
    reducers : {
        addToCart: (state, action) => {
            const product = action.payload

            state.cart.push(product);
            // push on localStorage
            localStorage.setItem('cart', JSON.stringify(state.cart));
            
            toast.success('Item Added')
        },
        removeFromCart(state, action) {
            const index = state.cart.findIndex((item) => item.pizzaId !== action.payload);
            state.cart.splice(index,1);
            // push on localStorage
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        increaseItemQuantity(state, action) {
            const item = state.cart.find((item) => item._id === action.payload);
    
            item.quantity++;

            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        decreaseItemQuantity(state, action) {
            const item = state.cart.find((item) => item._id === action.payload);
        
            item.quantity--;
            item.totalPrice = item.quantity * item.unitPrice;
    
            if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);

            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        clearCart(state) {
            state.cart = [];

            localStorage.removeItem('cart');
        },      
    }
})

export const {
    addToCart,
    removeFromCart,
    increaseItemQuantity,
    decreaseItemQuantity,
    clearCart,
  } = cartSlice.actions;
  
export default cartSlice.reducer;