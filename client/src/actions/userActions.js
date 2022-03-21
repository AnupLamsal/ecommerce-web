import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_REQUEST,
    USER_REGISTER_FAIL,
    USER_LOGOUT,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_DETAILS_RESET,
    ORDER_MY_LIST_RESET,
} from "./types";
import axios from "axios";

export const login = (email, password) => async dispatch => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const res = await axios.post(
            "/api/users/login",
            { email, password },
            config
        );

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: res.data,
        });

        localStorage.setItem("userInfo", JSON.stringify(res.data));
    } catch (err) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        });
    }
};

export const register = formData => async dispatch => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const res = await axios.post("/api/users", formData, config);

        dispatch({ type: USER_REGISTER_SUCCESS, payload: res.data });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data });

        localStorage.setItem("userInfo", JSON.stringify(res.data));
        console.log(typeof res.data);
    } catch (err) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        });
    }
};

export const getUserDetails = id => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST });

        const {
            userLogin: {
                userInfo: { token },
            },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": `${token}`,
            },
        };

        const res = await axios.get(`/api/users/${id}`, config);

        dispatch({ type: USER_DETAILS_SUCCESS, payload: res.data });
    } catch (err) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        });
    }
};

export const updateUserProfile = user => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

        const {
            userLogin: {
                userInfo: { token },
            },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": `${token}`,
            },
        };

        const res = await axios.put(`/api/users/profile`, user, config);

        dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: res.data });
        dispatch({ type: USER_DETAILS_SUCCESS, payload: res.data });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data });
    } catch (err) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        });
    }
};

export const logout = () => async dispatch => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: USER_DETAILS_RESET });
    dispatch({ type: ORDER_MY_LIST_RESET });
};
