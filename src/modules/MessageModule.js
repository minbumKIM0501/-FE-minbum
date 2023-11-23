import { createActions, handleActions } from "redux-actions";


const initialState = [];

export const POST_MESSAGES = 'message/POST_MESSAGES';
export const GET_MESSAGES = 'message/GET_MESSAGES';
export const GET_MESSAGES_MSGCODE = 'message/GET_MESSAGES';
export const GET_MESSAGES_ISRECEIVED = 'message/GET_MESSAGES_ISRECEIVED';
export const DELETE_MESSAGES_MSGCODE = 'message/DELETE_MESSAGES_MSGCODE';
export const GET_MESSAGES_KEYWORD = 'message/GET_MESSAGES_KEYWORD';


const actions = createActions({
    [POST_MESSAGES]: () => {},
    [GET_MESSAGES]: () => {},
    [GET_MESSAGES_MSGCODE]: () => {},
    [GET_MESSAGES_ISRECEIVED]: () => {},
    [DELETE_MESSAGES_MSGCODE]: () => {},
    [GET_MESSAGES_KEYWORD]: () => {}
});



const messageReducer = handleActions(
    {
        [POST_MESSAGES]: (state, {payload}) => {
            return payload;
        },

        [GET_MESSAGES]: (state, {payload}) => {
            return payload;
        },

        [GET_MESSAGES_MSGCODE]:(state, {payload}) => {
            return payload;
        },

        [GET_MESSAGES_ISRECEIVED]:(state, {payload}) => {
            return payload;
        },

        [DELETE_MESSAGES_MSGCODE]:(state, {payload}) => {
            return payload;
        },

        [GET_MESSAGES_KEYWORD]:(state, {payload}) => {
            return payload;
        }
    },
    initialState
);


export default messageReducer;