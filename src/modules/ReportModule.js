import { createActions, handleActions } from "redux-actions";
// 초기값
const initialState = [];

// Actions
export const GET_REPORT = 'report/GET_REPORT';
export const GET_REPORTS = 'report/GET_REPORTS';
export const GET_PROCESSDETAIL = 'report/GET_PROCESSDETAIL';
export const PUT_REPORT = 'report_PUT_REPORT';
export const POST_REPORT = 'report/PUT_REPORT';


const actions = createActions({
    [GET_REPORT]: () => { },
    [GET_REPORTS]: () => { },
    [GET_PROCESSDETAIL]: () => { },
    [PUT_REPORT]: () => { },
    [POST_REPORT]: () => { }
});

// reducer
const reportReducer = handleActions(
    {
        [GET_REPORT]: (state, { payload }) => {
            return payload;
        },
        [GET_REPORTS]: (state, { payload }) => {
            return payload;
        },
        [GET_PROCESSDETAIL]: (state, { payload }) => {
            return payload;
        },
        [PUT_REPORT]: (state, { payload }) => {
            return payload;
        },
        [POST_REPORT]: (state, { payload }) => {
            return payload;
        }
    },
    initialState
);

export default reportReducer;
