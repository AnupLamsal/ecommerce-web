import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    // USER_UPDATE_RESET,
} from "../actions/types";

const initialState = {
    userInfo: null,
};

const initialStateDetails = {
    user: {},
};

function userLogin(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case USER_LOGIN_REQUEST:
            return { ...state, loading: true };
        case USER_LOGIN_SUCCESS:
            return { ...state, loading: false, userInfo: payload };
        case USER_LOGIN_FAIL:
            return { ...state, loading: false, error: payload };
        case USER_LOGOUT:
            return { ...state, loading: false, userInfo: null };
        default:
            return state;
    }
}

function userRegister(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case USER_REGISTER_REQUEST:
            return { ...state, loading: true };
        case USER_REGISTER_SUCCESS:
            return { ...state, loading: false, userInfo: payload };
        case USER_REGISTER_FAIL:
            return { ...state, loading: false, error: payload };
        default:
            return state;
    }
}

function userDetails(state = initialStateDetails, action) {
    const { type, payload } = action;
    switch (type) {
        case USER_DETAILS_REQUEST:
            return { ...state, loading: true };
        case USER_DETAILS_SUCCESS:
            return { ...state, loading: false, user: payload };
        case USER_DETAILS_FAIL:
            return { ...state, loading: false, error: payload };
        case USER_DETAILS_RESET:
            return { ...state, user: {} };
        default:
            return state;
    }
}

function userUpdateProfile(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return { ...state, loading: true };
        case USER_UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                userInfo: payload,
            };
        case USER_UPDATE_PROFILE_FAIL:
            return { ...state, loading: false, error: payload };
        // case USER_UPDATE_RESET:
        //     return { ...state, loading: false, userInfo: payload };
        default:
            return state;
    }
}

export { userLogin, userRegister, userDetails, userUpdateProfile };
