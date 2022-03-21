import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { productList, productDetails } from "./reducers/productReducers";
import { cart } from "./reducers/CartReducers";
import {
    userLogin,
    userRegister,
    userDetails,
    userUpdateProfile,
} from "./reducers/UserReducers";
import {
    orderCreate,
    orderDetails,
    orderPay,
    orderMyList,
} from "./reducers/orderReducers";

const rootReducer = combineReducers({
    productList,
    productDetails,
    cart,
    userLogin,
    userRegister,
    userDetails,
    userUpdateProfile,
    orderCreate,
    orderDetails,
    orderPay,
    orderMyList,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {};

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
    ? JSON.parse(localStorage.getItem("paymentMethod"))
    : null;

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: paymentMethodFromStorage,
    },
    userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
