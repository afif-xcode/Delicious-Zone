import {createSlice} from "@reduxjs/toolkit"
import toast from "react-hot-toast"

const initialState = {
    cart : localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
    total: localStorage.getItem("total")
    ? JSON.parse(localStorage.getItem("total"))
    : 0,
    totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
}

const cartSlice = createSlice({
    name : "cart",
    initialState,
    reducers : {
        addToCart: (state, action) => {
            const product = action.payload

            let isPresent = state.cart.find((p, i) => {
                if(p.product._id === product._id) {
                    p.quantity++;
                    return true;
                }
            });
            
            if(!isPresent) {
                const item = {
                    product : product,
                    quantity : 1,
                }
                state.cart.push(item);
            }
            state.totalItems++;
            state.total += product.price;
            

            // push on localStorage
            localStorage.setItem('cart', JSON.stringify(state.cart));
            localStorage.setItem("total", JSON.stringify(state.total))
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
            toast.success('Item Added')
        },
        removeFromCart(state, action) {
            const index = state.cart.findIndex((item) => item.product._id !== action.payload);
            state.totalItems--;
            state.total -= state.cart[index].product.price
            state.cart.splice(index,1);
            // push on localStorage
            localStorage.setItem('cart', JSON.stringify(state.cart));
            localStorage.setItem("total", JSON.stringify(state.total))
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
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
            state.total = 0;
            state.totalItems = 0;
            localStorage.removeItem('cart');
            localStorage.removeItem("total")
            localStorage.removeItem("totalItems")
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