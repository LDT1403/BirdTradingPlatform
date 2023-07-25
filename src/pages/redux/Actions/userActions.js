import {
    GET_TOTAL_ORDER_FAIL,
    GET_TOTAL_ORDER_REQUEST,
    GET_TOTAL_ORDER_SUCCESS,
    SHOP_BAN_FAIL,
    SHOP_BAN_REQUEST,
    SHOP_BAN_SUCCESS,
    SHOP_LIST_FAIL,
    SHOP_LIST_REQUEST,
    SHOP_LIST_SUCCESS,
    SHOP_UNBAN_FAIL,
    SHOP_UNBAN_REQUEST,
    SHOP_UNBAN_SUCCESS,
    USER_BAN_FAIL,
    USER_BAN_REQUEST,
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
    USER_UNBAN_SUCCESS,

} from "../Constants/UserContants";
import axios from "axios";
import { toast } from "react-toastify";

// ALL USER
export const listUser = () => async (dispatch) => {
    try {
        dispatch({ type: USER_LIST_REQUEST });

        const accessToken = localStorage.getItem('jwtToken');

        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const { data } = await axios.get(`https://localhost:7241/api/Admin/detailcus`, config);

        dispatch({ type: USER_LIST_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            // dispatch(logout());
        }
        dispatch({
            type: USER_LIST_FAIL,
            payload: message,
        });
    }
};

// DELETE USER
export const deleteUser = (userId) => async (dispatch) => {
    try {
        dispatch({ type: USER_DELETE_REQUEST });

        // const {
        //     userLogin: { userInfo },
        // } = getState();
        const accessToken = localStorage.getItem('jwtToken');

        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        await axios.put(`https://localhost:7241/api/Admin/Bandaccount?userid=${userId}`, config);

        dispatch({ type: USER_DELETE_SUCCESS });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            // dispatch(logout());
        }
        dispatch({
            type: USER_DELETE_FAIL,
            payload: message,
        });
    }
};

// ORDER DELIVER
export const banUser = (userId) => async (dispatch) => {
    try {
        dispatch({ type: USER_BAN_REQUEST });

        const accessToken = localStorage.getItem('jwtToken');

        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const { data } = await axios.put(
            `https://localhost:7241/api/Admin/Bandaccount?userid=${userId}`,
            {},
            config
        );
        dispatch({ type: USER_BAN_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            // dispatch(logout());
        }
        dispatch({
            type: USER_BAN_FAIL,
            payload: message,
        });
    }
};

export const unbanUser = (userId) => async (dispatch) => {
    try {
        dispatch({ type: USER_UNBAN_REQUEST });

        const accessToken = localStorage.getItem('jwtToken');

        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const { data } = await axios.put(
            `https://localhost:7241/api/Admin/OpenAccount?userid=${userId}`,
            {},
            config
        );
        dispatch({ type: USER_UNBAN_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            // dispatch(logout());
        }
        dispatch({
            type: USER_UNBAN_FAIL,
            payload: message,
        });
    }
};

export const banShop = (shopId) => async (dispatch) => {
    try {
        dispatch({ type: SHOP_BAN_REQUEST });

        const accessToken = localStorage.getItem('jwtToken');

        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const { data } = await axios.post(
            `https://localhost:7241/api/Admin/Sendwarning?shopid=${shopId}`,
            {},
            config
        );
        dispatch({ type: SHOP_BAN_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            // dispatch(logout());
        }
        dispatch({
            type: SHOP_BAN_FAIL,
            payload: message,
        });
    }
};

export const unbanShop = (userId) => async (dispatch) => {
    try {
        dispatch({ type: SHOP_UNBAN_REQUEST });

        const accessToken = localStorage.getItem('jwtToken');

        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const { data } = await axios.put(
            `https://localhost:7241/api/Admin/OpenAccount?userid=${userId}`,
            {},
            config
        );
        dispatch({ type: SHOP_UNBAN_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            // dispatch(logout());
        }
        dispatch({
            type: SHOP_UNBAN_FAIL,
            payload: message,
        });
    }
};


// ALL SHOP
export const listShop = () => async (dispatch) => {
    try {
        dispatch({ type: SHOP_LIST_REQUEST });

        const accessToken = localStorage.getItem('jwtToken');

        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const { data } = await axios.get(`https://localhost:7241/api/Admin/DetailShop`, config);

        dispatch({ type: SHOP_LIST_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            // dispatch(logout());
        }
        dispatch({
            type: SHOP_LIST_FAIL,
            payload: message,
        });
    }
}


export const getTotalOrder = () => async (dispatch) => {
    try {
        dispatch({ type: GET_TOTAL_ORDER_REQUEST });

        const accessToken = localStorage.getItem('jwtToken');

        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const { data } = await axios.get(`https://localhost:7241/api/Admin/totalOrder`, config);

        dispatch({ type: GET_TOTAL_ORDER_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            // dispatch(logout());
        }
        dispatch({
            type: GET_TOTAL_ORDER_FAIL,
            payload: message,
        });
    }
}