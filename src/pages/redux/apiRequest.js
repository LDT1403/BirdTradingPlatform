import axios from "axios";
import { loginFailed, loginStart, loginSuccess, registerFailed, registerStart, registerSuccess } from "./authSilce";
import { toast } from 'react-toastify';
import jwt_decode from "jwt-decode";
// import { getBirdsFailed, getBirdsSuccess, getBridsStart } from "./birdSlice";


export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    // console.log(user)
    // console.log(dispatch)
    try {
        const res = await axios.post("https://localhost:7241/api/User/Login", user);
        console.log(res.data)
        const token = jwt_decode(res.data.data.accessToken);
        dispatch(loginSuccess(token));
        saveTokenToLocalStorage(res.data.data.accessToken);
        toast.success("Login Success");
        navigate("/");

    } catch (err) {
        dispatch(loginFailed);
        toast.error("Sai Email hoac Password");
    }
};
function saveTokenToLocalStorage(token) {
    localStorage.setItem('jwtToken', token);
}
// function parseJwt(token) {
//     var base64Url = token.split('.')[1];
//     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
//         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));

//     return JSON.parse(jsonPayload);
// }


export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        console.log("sfdfs")
        await axios.post("https://localhost:7241/api/User/Register", user);

        dispatch(registerSuccess());

        navigate("/login");

    } catch (err) {
        console.log("err")
        dispatch(registerFailed);

    }
}

