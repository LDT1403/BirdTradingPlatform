import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",
    initialState: {
        registerShop: {
            isFetching: false,
            error: false,
            success: false,
        },
    },
    reducers: {
        registerShopStart: (state) => {
            state.registerShop.isFetching = true;
        },
        registerShopSuccess: (state) => {
            state.registerShop.isFetching = false;
            state.registerShop.success = true;
            state.registerShop.error = false;

        },
        registerShopFailed: (state) => {
            state.registerShop.isFetching = false;
            state.registerShop.error = false;
            state.registerShop.success = false;
        },
    }
})

export const {
    registerShopFailed,
    registerShopStart,
    registerShopSuccess,
} = userSlice.actions;

export default userSlice.reducer;