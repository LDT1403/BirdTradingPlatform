import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSilce';
import cartReducer from './cartSlice';
import cartUiSlice from '../../store/shopping-cart/cartUiSlice';


export default configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        cartUi: cartUiSlice.reducer,
    }
})