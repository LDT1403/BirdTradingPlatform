import {
    ORDER_CONFIRM_FAIL,
    ORDER_CONFIRM_REQUEST,
    ORDER_CONFIRM_RESET,
    ORDER_CONFIRM_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
} from "../Constants/OrderConstants";

export const orderListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ORDER_LIST_REQUEST:
            return { loading: true };
        case ORDER_LIST_SUCCESS:
            return { loading: false, orders: action.payload };
        case ORDER_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// ORDER DETAILS
export const orderDetailsReducer = (
    state = { loading: true, orderItems: [], shippingAddress: {} },
    action
) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return { ...state, loading: true };
        case ORDER_DETAILS_SUCCESS:
            return { loading: false, order: action.payload };
        case ORDER_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// ORDER CONFIRM
export const orderConfirmReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CONFIRM_REQUEST:
            return { loading: true };
        case ORDER_CONFIRM_SUCCESS:
            return { loading: false, success: true };
        case ORDER_CONFIRM_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_CONFIRM_RESET:
            return {};
        default:
            return state;
    }
};