import {
    GET_TOTAL_ORDER_FAIL,
    GET_TOTAL_ORDER_REQUEST,
    GET_TOTAL_ORDER_SUCCESS,
    SHOP_BAN_FAIL,
    SHOP_BAN_REQUEST,
    SHOP_BAN_RESET,
    SHOP_BAN_SUCCESS,
    SHOP_LIST_FAIL,
    SHOP_LIST_REQUEST,
    SHOP_LIST_RESET,
    SHOP_LIST_SUCCESS,
    SHOP_UNBAN_FAIL,
    SHOP_UNBAN_REQUEST,
    SHOP_UNBAN_RESET,
    SHOP_UNBAN_SUCCESS,
    USER_BAN_FAIL,
    USER_BAN_REQUEST,
    USER_BAN_RESET,
    USER_BAN_SUCCESS,
    USER_DELETE_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_RESET,
    USER_LIST_SUCCESS,
    USER_UNBAN_FAIL,
    USER_UNBAN_REQUEST,
    USER_UNBAN_RESET,
    USER_UNBAN_SUCCESS,
} from "../Constants/UserContants";

// ALL USER
export const userListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return { loading: true };
        case USER_LIST_SUCCESS:
            return { loading: false, users: action.payload };
        case USER_LIST_FAIL:
            return { loading: false, error: action.payload };
        case USER_LIST_RESET:
            return { users: [] };
        default:
            return state;
    }
};
// DELETE PRODUCT
export const userDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DELETE_REQUEST:
            return { loading: true };
        case USER_DELETE_SUCCESS:
            return { loading: false, success: true };
        case USER_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// ALL SHOP
export const shopListReducer = (state = { shops: [] }, action) => {
    switch (action.type) {
        case SHOP_LIST_REQUEST:
            return { loading: true };
        case SHOP_LIST_SUCCESS:
            return { loading: false, shops: action.payload };
        case SHOP_LIST_FAIL:
            return { loading: false, error: action.payload };
        case SHOP_LIST_RESET:
            return { users: [] };
        default:
            return state;
    }
};

export const userBanReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_BAN_REQUEST:
            return { loading: true };
        case USER_BAN_SUCCESS:
            return { loading: false, success: true };
        case USER_BAN_FAIL:
            return { loading: false, error: action.payload };
        case USER_BAN_RESET:
            return {};
        default:
            return state;
    }
};
export const userUnBanReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UNBAN_REQUEST:
            return { loading: true };
        case USER_UNBAN_SUCCESS:
            return { loading: false, success: true };
        case USER_UNBAN_FAIL:
            return { loading: false, error: action.payload };
        case USER_UNBAN_RESET:
            return {};
        default:
            return state;
    }
};
export const shopBanReducer = (state = {}, action) => {
    switch (action.type) {
        case SHOP_BAN_REQUEST:
            return { loading: true };
        case SHOP_BAN_SUCCESS:
            return { loading: false, success: true };
        case SHOP_BAN_FAIL:
            return { loading: false, error: action.payload };
        case SHOP_BAN_RESET:
            return {};
        default:
            return state;
    }
};
export const shopUnBanReducer = (state = {}, action) => {
    switch (action.type) {
        case SHOP_UNBAN_REQUEST:
            return { loading: true };
        case SHOP_UNBAN_SUCCESS:
            return { loading: false, success: true };
        case SHOP_UNBAN_FAIL:
            return { loading: false, error: action.payload };
        case SHOP_UNBAN_RESET:
            return {};
        default:
            return state;
    }
};
export const getTotalOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_TOTAL_ORDER_REQUEST:
            return { loading: true };
        case GET_TOTAL_ORDER_SUCCESS:
            return { loading: false, totalorder: action.payload };
        case GET_TOTAL_ORDER_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};