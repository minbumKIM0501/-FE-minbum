import { createActions, handleActions } from 'redux-actions';

const initialState = {
    accessToken: null,
    user: null,

  };

export const GET_USERS     = 'user/GET_MEMBER';
export const POST_LOGIN     = 'user/POST_LOGIN';
export const POST_JOIN  = 'user/POST_REGISTER';

const actions = createActions({
    [GET_USERS]: () => {},
    [POST_LOGIN]: () => {},
    [POST_JOIN]: () => {}
});

const userReducer = handleActions(
    {
        [GET_USERS]: (state, { payload }) => {
            
            return {
                ...state,
                accessToken: payload.accessToken,
                user: payload.user,
            };
        },
        [POST_LOGIN]: (state, { payload }) => {
            
            return payload;
        },
        [POST_JOIN]: (state, { payload }) => {
            
            return payload;
        },

    },
    initialState
);

export default userReducer;