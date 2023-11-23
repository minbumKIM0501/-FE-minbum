import { createActions, handleActions } from "redux-actions";


const initialState = [];

export const GET_CATEGORIES = 'product/GET_CATEGORIES';

const actions = createActions({
    [GET_CATEGORIES]: () => {},
});

const productCategoryReducer = handleActions(
    {
        [GET_CATEGORIES]: (state, {payload}) => {
            return payload;
        }
    },
    initialState
);

export default productCategoryReducer;