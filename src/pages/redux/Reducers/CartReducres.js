import { CART_LIST_FAIL, CART_LIST_REQUEST, CART_LIST_SUCCESS } from "../Constants/CartConstants";

export const cartListReducer = (state = { cart: [] }, action) => {
    switch (action.type) {
        case CART_LIST_REQUEST:
            return { loading: true };
        case CART_LIST_SUCCESS:
            return { loading: false, carts: action.payload };
        case CART_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};