import {
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_EDIT_FAIL,
    PRODUCT_EDIT_REQUEST,
    PRODUCT_EDIT_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS
} from '../Constants/ProductConstants';

import axios from 'axios';


export const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });

        // const {
        //     userLogin: { userInfo },
        // } = getState();
        const accessToken = localStorage.getItem('jwtToken');
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const { data } = await axios.get(`https://localhost:7241/api/Shop/getproductshop`, config);


        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            // dispatch(logout());
        }
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: message,
        });
    }
}

// DELETE PRODUCT
export const deleteProduct = (productId) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DELETE_REQUEST });

        // const {
        //     userLogin: { userInfo },
        // } = getState();
        const accessToken = localStorage.getItem('jwtToken');

        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        await axios.delete(`https://localhost:7241/api/Shop/Delete_Product?productId=${productId}`, config);

        dispatch({ type: PRODUCT_DELETE_SUCCESS });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            // dispatch(logout());
        }
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: message,
        });
    }
};

// CREATE PRODUCT
export const createProduct =
    (ProductName, Price, DiscountPercent, CateId, Quantity, Decription, ImageFile) =>
        async (dispatch) => {
            try {
                console.log(ProductName, Price, DiscountPercent, CateId, Quantity, Decription, ImageFile)
                dispatch({ type: PRODUCT_CREATE_REQUEST });
                const formData = new FormData();
                formData.append('ProductName', ProductName);
                formData.append('Price', Price);
                formData.append('DiscountPercent', DiscountPercent);
                formData.append('Decription', Decription);
                formData.append('Quantity', Quantity);
                formData.append('CateId', CateId);
                for (let i = 0; i < ImageFile.length; i++) {
                    formData.append('ImageFile', ImageFile[i]);
                }


                console.log(formData)
                const accessToken = localStorage.getItem('jwtToken');

                const config = {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                };
                console.log(accessToken)
                const { data } = await axios.post(
                    `https://localhost:7241/api/Shop/Add_Product`,
                    formData,
                    config,

                );
                console.log("dfsa")
                dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
            } catch (error) {
                console.log(error);
                const message =
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message;
                if (message === "Not authorized, token failed") {
                    // dispatch(logout());
                }
                dispatch({
                    type: PRODUCT_CREATE_FAIL,
                    payload: message,
                });
            }
        };

// EDIT PRODUCT
export const editProduct = (ProductId) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_EDIT_REQUEST });
        const accessToken = localStorage.getItem('jwtToken');
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const { data } = await axios.get(`https://localhost:7241/api/Shop/Detail_Product?productId=${ProductId}`, config);
        dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            // dispatch(logout());
        }
        dispatch({
            type: PRODUCT_EDIT_FAIL,
            payload: message,
        });
    }
};

// UPDATE PRODUCT
export const updateProduct = (ProductId, ProductName, Price, DiscountPercent, CateId, Quantity, Decription, ImageFile) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_UPDATE_REQUEST });
        const formData = new FormData();
        formData.append('ProductId', ProductId);
        formData.append('Name', ProductName);
        formData.append('Price', Price);
        formData.append('DiscountPercent', DiscountPercent);
        formData.append('Decription', Decription);
        formData.append('Quantity', Quantity);
        formData.append('CateId', CateId);
        for (let i = 0; i < ImageFile.length; i++) {
            formData.append('ImageFile', ImageFile[i]);
        }
        console.log(ProductId, ProductName, Price, DiscountPercent, CateId, Quantity, Decription)
        const accessToken = localStorage.getItem('jwtToken');
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const { data } = await axios.put(
            `https://localhost:7241/api/Shop/Update_Product`,
            formData,
            config
        );

        dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
        dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: data });
    } catch (error) {
        console.log(error)
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            // dispatch(logout());
        }
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: message,
        });
    }
};
