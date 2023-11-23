import { createActions, handleActions } from "redux-actions";


const initialState = [];

export const GET_PAGING = 'PAGING';

const actions = createActions({
    [GET_PAGING]: () => {}
});

const pagingReducer = handleActions(
    {
        [GET_PAGING]: (state, {payload}) => {
            return payload;
        }
    },
    initialState
)

export default pagingReducer;