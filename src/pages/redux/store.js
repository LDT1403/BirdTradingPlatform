import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './authSilce';
import cartReducer from './cartSlice';
import cartUiSlice from '../../store/shopping-cart/cartUiSlice';
import userReducer from './userSlice';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { productCreateReducer, productDeleteReducer, productEditReducer, productListReducer, productUpdateReducer } from './Reducers/ProductReducres';
import { orderCancelReducer, orderConfirmReducer, orderDetailsReducer, orderListReducer } from './Reducers/OrderReducres';
import { getTotalOrderReducer, shopBanReducer, shopListReducer, shopUnBanReducer, userBanReducer, userDeleteReducer, userListReducer, userUnBanReducer } from './Reducers/userReducers';
import { cartListReducer } from './Reducers/CartReducres';
import { getTotalOrder } from './Actions/userActions';


const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['auth']
}

const rootReducer = combineReducers({
    auth: authReducer, cart: cartReducer,
    cartUi: cartUiSlice.reducer,
    users: userReducer,
    productList: productListReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productEdit: productEditReducer,
    productUpdate: productUpdateReducer,
    orderList: orderListReducer,
    orderDetails: orderDetailsReducer,
    comfirmOrder: orderConfirmReducer,
    cancelOrder: orderCancelReducer,
    userList: userListReducer,
    shopList: shopListReducer,
    userDelete: userDeleteReducer,
    banUser: userBanReducer,
    unbanUser: userUnBanReducer,
    banShop: shopBanReducer,
    unbanShop: shopUnBanReducer,
    cart: cartListReducer,
    totalOrder: getTotalOrderReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER],
            },
        }),
})

export let persistor = persistStore(store);

// export default configureStore({
//     reducer: {

//     }
// })