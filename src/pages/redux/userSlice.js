import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",
    initialState: {
        registerShop: {
            isFetching: false,
            error: false,
            currentShop: { roleId: "", error: "", message: "", data: "" }
        },
        changePassword:{
            isFetching: false,
            error: false,
            success: false,
        },
        updateUser:{
            isFetching: false,
            error: false,
            success: false,
        }
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
        changePasswordStart: (state) => {
            state.changePassword.isFetching = true;
          },
          changePasswordSuccess: (state) => {
              state.changePassword.isFetching = false;
              state.changePassword.success = true;
              state.changePassword.error = false;
  
          },
          changePasswordFailed: (state) => {
              state.changePassword.isFetching = false;
              state.changePassword.error = false;
              state.changePassword.success = false;
          },
           updateUserStart: (state) => {
              state.updateUser.isFetching = true;
            },
            updateUserSuccess: (state) => {
                state.updateUser.isFetching = false;
                state.updateUser.success = true;
                state.updateUser.error = false;
    
            },
            updateUserFailed: (state) => {
                state.updateUser.isFetching = false;
                state.updateUser.error = false;
                state.updateUser.success = false;
            },
    }
})

export const {
    registerShopFailed,
    registerShopStart,
    registerShopSuccess,
    changePasswordFailed,
    changePasswordStart,
    changePasswordSuccess,
    updateUserFailed,
    updateUserStart,
    updateUserSuccess,
} = userSlice.actions;

export default userSlice.reducer;