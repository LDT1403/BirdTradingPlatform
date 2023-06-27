import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",
    initialState: {
        registerShop: {
            isFetching: false,
            error: false,
            currentShop: { roleId: "", error: "", message: "", data: "" }
        },
    },
    reducers: {
        registerShopStart: (state) => {
            state.registerShop.isFetching = true;
        },
        registerShopSuccess: (state, action) => {
            state.registerShop.isFetching = false;
            state.registerShop.currentShop = action.payload;
            state.registerShop.error = false;

        },
        registerShopFailed: (state) => {
            state.registerShop.isFetching = false;
            state.registerShop.error = false;
        },
    }
})

export const {
    registerShopFailed,
    registerShopStart,
    registerShopSuccess,
} = userSlice.actions;

export default userSlice.reducer;