// MyProductAPICalls.js

import axios from "axios";
import { GET_MY_PRODUCT_LIST } from "../modules/ProductModule";
import { jwtDecode } from "jwt-decode";
import { getCookie } from "../modules/CookieModule";

export const callGetMyProductListAPI = async (page = 1) => {
    const userCode = jwtDecode(getCookie("accessToken")).userCode;
    let requestURL = `http://localhost:8000/users/${userCode}/products`;

    const params = new URLSearchParams(window.location.search);
    if (params.get("page")) {
        requestURL += `?page=${params.get("page")}`;
    }

    try {
        const result = await axios.get(requestURL, {
            headers: {
                Authorization: `Bearer ${getCookie("accessToken")}`,
                "Accept": "*/*"
            }
        });

        return result.data.results;
    } catch (error) {
        console.error("Error fetching my product list:", error);
        throw error;
    }
};