import { createActions, handleActions } from "redux-actions";

const initialState = {};

export const GET_WISHLIST = 'wishList/GET_WISHLIST';

const actions = createActions({
    [GET_WISHLIST]: () => {},
});

const wishListReducer = handleActions(
    {
        [GET_WISHLIST]: (state, {payload}) => ({
            ...state,
            getWishList: payload
        }),
    },
    initialState
)

export default wishListReducer;