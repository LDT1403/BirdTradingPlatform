import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSilce';


export default configureStore({
    reducer: {
        auth: authReducer,
    }
})