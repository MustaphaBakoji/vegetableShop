import { configureStore, combineReducers } from "@reduxjs/toolkit"
import userReducer from './UserSlice'
import cartReducer from './cartSlice'
let reducers = combineReducers({
    userReducer,
    cartReducer
})
let Store = configureStore({

    reducer: reducers
})

export default Store;