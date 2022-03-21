import {
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAT_PRODUCT_DETAILS,
} from "../actions/types";

const initialProductsState = {
    products: [],
    loading: true,
    error: {},
};

const initialProductState = {
    product: null,
    loading: true,
    error: {},
};

function productList(state = initialProductsState, action) {
    const { type, payload } = action;
    switch (type) {
        case PRODUCT_LIST_SUCCESS:
            return { ...state, loading: false, products: payload };
        case PRODUCT_LIST_FAIL:
            return { ...state, loading: false, error: payload };
        default:
            return state;
    }
}

function productDetails(state = initialProductState, action) {
    const { type, payload } = action;
    switch (type) {
        case PRODUCT_DETAILS_SUCCESS:
            return { ...state, loading: false, product: payload };
        case PRODUCT_DETAILS_FAIL:
            return { ...state, loading: false, error: payload };
        case CLEAT_PRODUCT_DETAILS:
            return { ...state, loading: false, product: null };
        default:
            return state;
    }
}

export { productDetails, productList };
