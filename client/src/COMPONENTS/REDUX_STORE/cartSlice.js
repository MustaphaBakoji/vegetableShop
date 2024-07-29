import { createSlice } from "@reduxjs/toolkit"

let initialState = {
    showCart: false
}
let CartSlice = createSlice({
    name: 'cartSlice', initialState,
    reducers: {
        toggleCart(state) {
            state.showCart = !state.showCart
        }
    }

})
export default CartSlice.reducer
let cartActions = CartSlice.actions
export { cartActions }