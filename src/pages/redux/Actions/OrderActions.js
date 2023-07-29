//import { Navigate } from "react-router-dom";
import {
    ORDER_CANCEL_FAIL,
    ORDER_CANCEL_REQUEST,
    ORDER_CANCEL_SUCCESS,
    ORDER_CONFIRM_FAIL,
    ORDER_CONFIRM_REQUEST,
    ORDER_CONFIRM_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
} from "../Constants/OrderConstants";
// import { logout } from "./userActions";
import axios from "axios";

export const listOrders = () => async (dispatch) => {
    try {
        dispatch({ type: ORDER_LIST_REQUEST });

        const accessToken = localStorage.getItem('jwtToken');

        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const { data } = await axios.get(`https://birdtradingplatformapi.azurewebsites.net/api/Shop/orders`, config);
        console.log(data)
        dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            // dispatch(logout());
        }
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: message,
        });
    }
};

// ORDER DETAILS
export const getOrderDetails = (id) => async (dispatch) => {
    try {
        console.log(id)
        dispatch({ type: ORDER_DETAILS_REQUEST });

        const accessToken = localStorage.getItem('jwtToken');

        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const { data } = await axios.get(`https://birdtradingplatformapi.azurewebsites.net/api/Shop/Detail_Order?orderId=${id}`, config);
        console.log(data)
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {

        }
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: message,
        });
    }
};

// ORDER DELIVER
export const confirmOrder = (order) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_CONFIRM_REQUEST });
        console.log(order)
        const accessToken = localStorage.getItem('jwtToken');

        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const { data } = await axios.put(
            `
            https://birdtradingplatformapi.azurewebsites.net/api/Shop/Confim_Order?orderId=${order.orderId}`,
            {},
            config
        );
        dispatch({ type: ORDER_CONFIRM_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            // dispatch(logout());
        }
        dispatch({
            type: ORDER_CONFIRM_FAIL,
            payload: message,
        });
    }
};

// ORDER DELIVER
export const cancelOrder = (orderId, reson) => async (dispatch) => {
    try {
        console.log(reson)
        dispatch({ type: ORDER_CANCEL_REQUEST });
        console.log(orderId)
        const accessToken = localStorage.getItem('jwtToken');

        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const { data } = await axios.put(
            `https://birdtradingplatformapi.azurewebsites.net/api/Shop/Cancle_Order?orderId=${orderId}`,
            reson,
            config
        );
        dispatch({ type: ORDER_CANCEL_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            // dispatch(logout());
        }
        dispatch({
            type: ORDER_CANCEL_FAIL,
            payload: message,
        });
    }
};