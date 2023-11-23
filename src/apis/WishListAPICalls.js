import axios from "axios";
import { GET_WISHLIST_DELELE_RESULT } from "../modules/ProductModule";
import { GET_WISHLIST } from "../modules/WishListModule";
import { jwtDecode } from "jwt-decode";
import { getCookie } from "../modules/CookieModule";

export const callWishListDeleteAPI = productCode => {
    let requestURL = `http://localhost:8000/wishLists/${productCode}`;
    
    return async (dispatch, getState) => {
        const result = await axios.delete(requestURL, {
            headers: {
                "Accept": "*/*"
            }
        }).then(
            result => result
        );
        dispatch({ type: GET_WISHLIST_DELELE_RESULT, payload: 1});
    };
}

export const callGetWishListAPI = () => {
    let requestURL = `http://localhost:8000/users/${jwtDecode(getCookie("accessToken")).userCode}/wishLists`;

    const params = new URLSearchParams(window.location.search);
    if(params.get("page")) {
        requestURL += `?page=${params.get("page")}`;
    }

    return async (dispatch, getState) => {
        const result = await axios.get(requestURL, {
            headers: {
                Authorization: `Bearer ${getCookie("accessToken")}`
            }
        }).then(
            result => result.data.results
        );
        dispatch({ type: GET_WISHLIST, payload: result});
    };
}