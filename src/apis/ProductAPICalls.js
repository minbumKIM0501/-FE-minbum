import axios from "axios";
import { GET_CATEGORIES } from "../modules/ProductCategoryModule";
import { GET_PRODUCTLIST } from "../modules/ProductListModule";
import { GET_MESSAGES_RESULT, GET_PRODUCT_DETAIL, GET_WISHLIST_AGAIN, GET_WISHLIST_DELELE_RESULT, GET_WISHLIST_REGIST_RESULT } from "../modules/ProductModule";
import { jwtDecode } from "jwt-decode";
import { getCookie } from "../modules/CookieModule";

export const callGetProductCategory = () => {
    const requestURL = `http://localhost:8000/categories`;

    return async (dispatch, getState) => {
        const result = await axios.get(requestURL, {
            headers: {
                "Accept": "*/*"
            }
        }).then(
            result => result.data.results.productCategoryList
        );

        dispatch({ type: GET_CATEGORIES, payload: result});
    };
}

export const callGetProductList = (type) => {
    let requestURL = `http://localhost:8000/products?pageKind=${type}`;

    const params = new URLSearchParams(window.location.search);
    if(params.get("page")) {
        requestURL += `&page=${params.get("page")}`;
    }
    if(params.get("categoryCode")) {
        requestURL += `&categoryCode=${params.get("categoryCode")}`;
    }
    if(params.get("sortCondition")) {
        requestURL += `&sortCondition=${params.get("sortCondition")}`;
    }
    if(params.get("minPrice")) {
        requestURL += `&minPrice=${params.get("minPrice")}`;
    }
    if(window.localStorage.getItem("remainMoneySearch") && type === "merge") {
        if((+window.localStorage.getItem("remainMoneySearch")) >= 0) {
            requestURL += `&maxPrice=${parseInt(+window.localStorage.getItem("remainMoney") * 1.1)}`;
        } else {
            requestURL += `&maxPrice=${0}`;
        }
    }
    if(params.get("maxPrice")) {
        requestURL += `&maxPrice=${params.get("maxPrice")}`;
    }
    return async (dispatch, getState) => {
        const result = await axios.get(requestURL, {
            headers: {
                "Accept": "*/*"
            }
        }).then(
            result => result.data.results
        );

        dispatch({ type: GET_PRODUCTLIST, payload: [result]});
    };
}

export const callMessagesRegistAPI = (productCode, refUserCode) => {
    let requestURL = `http://localhost:8000/messages`;
    let date = new Date().toISOString().substring(0, 10); 

    return async (dispatch, getState) => {
        const result = await axios.post(requestURL, {
            msgCode: 0,
            msgContent: "상품 구매합니다.",
            msgDeleteInfoMsgDeleteDTO: {
                msgDeleteCode: 1,
                msgDeleteStatus: "N"
            },
            msgStatus: "N",
            msgTime: date,
            receiverCode: refUserCode,
            refProductCode: productCode,
            senderCode: jwtDecode(getCookie("accessToken")).userCode
        }
        ).then(response => response);
        dispatch({ type: GET_MESSAGES_RESULT, payload: 1});
    };
}

export const callGetProductDetail = path => {

    const requestURL = `http://localhost:8000/products/${path}`;

    let isView;
    if(!window.localStorage.getItem(`${path}view`)) {
        window.localStorage.setItem(`${path}view`, 1);
        isView = "false";
    } else {
        isView = "true";
    }

    return async (dispatch, getState) => {
        const result = await axios.get(requestURL, {
            headers: {
                "Accept": "*/*"
            },
            params: {
                isView: isView,
                userCode: getCookie("accessToken") && jwtDecode(getCookie("accessToken")).userCode
            }
        }).then(
            result => result.data.results
        );

        dispatch({ type: GET_PRODUCT_DETAIL, payload: result});
    };
}

export const callWishListRegistAPI = productCode => {
    let requestURL = `http://localhost:8000/products/${productCode}/wishLists`;
    return async (dispatch, getState) => {
        const result = await axios.post(requestURL, {
            refUserCode: jwtDecode(getCookie("accessToken")).userCode
        }
        ).then(response => response.data.results.result);
        dispatch({ type: GET_WISHLIST_REGIST_RESULT, payload: result});
    };
}