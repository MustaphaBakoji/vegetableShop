import { createSlice } from "@reduxjs/toolkit";
let initialState = {
    islogedIn: false,
    isAdmin: false
}
let userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        setLogin(state) {
            state.islogedIn = true
        },
        setIsAdmin(state) {
            state.isAdmin = true
        },

    }
})
let userActions = userSlice.actions;
export { userActions };
export default userSlice.reducer