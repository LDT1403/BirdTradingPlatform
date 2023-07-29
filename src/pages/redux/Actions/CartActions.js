import { CART_LIST_FAIL, CART_LIST_REQUEST, CART_LIST_SUCCESS } from "../Constants/CartConstants";
import axios
    from "axios";
export const listCarts = () => async (dispatch) => {
    try {
        dispatch({ type: CART_LIST_REQUEST });

        const accessToken = localStorage.getItem('jwtToken');

        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const { data } = await axios.get(`https://birdtradingplatformapi.azurewebsites.net/api/Order/ViewCartQuantity`, config);
        console.log(data)
        dispatch({ type: CART_LIST_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            // dispatch(logout());
        }
        dispatch({
            type: CART_LIST_FAIL,
            payload: message,
        });
    }
};