import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_PAYMENT_METHOD,
    CART_SAVE_SHIPPING_ADDRESS,
} from "../actions/types";

const initialState = {
    cartItems: [],
    shippingAddress: {},
    paymentMethod: null,
};

function cart(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case CART_ADD_ITEM:
            const existItem = state.cartItems.find(
                item => item.product === payload.product
            );

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(item =>
                        item.product === existItem.product ? payload : item
                    ),
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, payload],
                };
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    item => item.product !== payload
                ),
            };
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload,
            };
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload,
            };
        default:
            return state;
    }
}

export { cart };
