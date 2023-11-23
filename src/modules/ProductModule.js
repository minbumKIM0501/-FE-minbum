import { createActions, handleActions } from "redux-actions";


const initialState = {};

export const GET_PRODUCT_FILTER = 'product/GET_PRODUCT_FILTER';
export const GET_RESET_FILTER = 'product/GET_RESET_FILTER';
export const GET_RESET_PRODUCT_CATEGERY = 'product/GET_RESET_PRODUCT_CATEGERY';
export const GET_RESET_MERGE_CATEGERY_ALL = 'product/GET_RESET_MERGE_CATEGERY';
export const GET_CATEGORY_CODE = 'product/GET_CATEGORY_CODE';
export const GET_MERGE_ITEM = 'product/GET_MERGE_ITEM';
export const GET_SEARCH_AGAIN = 'product/GET_SEARCH_AGAIN';
export const POST_PRODUCT = 'product/POST_PRODUCT';
export const PUT_PRODUCT = 'product/PUT_PRODUCT';
export const GET_MESSAGES_RESULT = 'product/GET_MESSAGES_RESULT';
export const GET_PRODUCT_DETAIL = 'product/GET_PRODUCT_DETAIL';
export const GET_WISHLIST_REGIST_RESULT = 'product/GET_WISHLIST_REGIST_RESULT';
export const GET_WISHLIST_DELELE_RESULT = 'product/GET_WISHLIST_DELELE_RESULT';
export const GET_MONEY_SETTING = 'product/GET_MONEY_SETTING';
export const GET_WISHLIST_AGAIN = 'product/GET_WISHLIST_AGAIN';

export const priceToString = (price) => {
	return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "원";
}

export const timeForToday = (value) => {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    if (betweenTime < 1) return '방금전';
    if (betweenTime < 60) {
        return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
        return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
        return `${betweenTimeDay}일전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`;
}

export const onClickItemDetail = path => {
    window.open(`/usedProduct/${path}`, '_blank');
}

const actions = createActions({
    [GET_PRODUCT_FILTER]: () => {},
    [GET_RESET_FILTER]: () => {},
    [GET_RESET_PRODUCT_CATEGERY]: () => {},
    [GET_RESET_MERGE_CATEGERY_ALL]: () => {},
    [GET_CATEGORY_CODE]: () => {},
    [GET_MERGE_ITEM]: () => {},
    [GET_SEARCH_AGAIN]: () => {},
    [GET_MESSAGES_RESULT]: () => {},
    [GET_PRODUCT_DETAIL]: () => {},
    [GET_WISHLIST_REGIST_RESULT]: () => {},
    [GET_WISHLIST_DELELE_RESULT]: () => {},
    [GET_MONEY_SETTING]: () => {},
    [GET_WISHLIST_AGAIN]: () => {},
});

const productReducer = handleActions(
    {
        [GET_PRODUCT_FILTER]: (state, {payload}) => ({
            ...state,
            productFilter: payload
        }),
        [GET_RESET_FILTER]: (state, {payload}) => ({
            ...state,
            resetFilter: payload
        }),
        [GET_RESET_PRODUCT_CATEGERY]: (state, {payload}) => ({
            ...state,
            resetProductCategory: payload
        }),
        [GET_RESET_MERGE_CATEGERY_ALL]: (state, {payload}) => ({
            ...state,
            resetMergeCategoryAll: payload
        }),
        [GET_CATEGORY_CODE]: (state, {payload}) => ({
            ...state,
            getCategoryCode: payload
        }),
        [GET_MERGE_ITEM]: (state, {payload}) => ({
            ...state,
            getMergeItem: payload
        }),
        [GET_SEARCH_AGAIN]: (state, {payload}) => ({
            ...state,
            searchAgain: payload
        }),
        [GET_MONEY_SETTING]: (state, {payload}) => ({
            ...state,
            getMoneySetting: payload
        }),
        [GET_MESSAGES_RESULT]: (state, {payload}) => ({
            ...state,
            getMessagesResult: payload
        }),
        [GET_PRODUCT_DETAIL]: (state, {payload}) => ({
            ...state,
            getProductDetail: payload
        }),
        [GET_WISHLIST_REGIST_RESULT]: (state, {payload}) => ({
            ...state,
            getWishListRegistResult: payload
        }),
        [GET_WISHLIST_DELELE_RESULT]: (state, {payload}) => ({
            ...state,
            getWishListDeleteResult: payload
        }),
        [GET_WISHLIST_AGAIN]: (state, {payload}) => ({
            ...state,
            getWishListAgain: payload
        }),
    },
    initialState
)

export default productReducer;