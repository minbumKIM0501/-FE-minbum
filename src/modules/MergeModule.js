import { createActions, handleActions } from "redux-actions";


const initialState = [];

export const GET_MERGE_CATEGORY = 'merge/GET_MERGE_CATEGORY';

const actions = createActions({
    [GET_MERGE_CATEGORY]: () => {}
});

const mergeReducer = handleActions(
    {
        [GET_MERGE_CATEGORY]: (state, {payload}) => {
            return payload;
        }
    },
    initialState
)

export default mergeReducer;