import{ POST_LOGIN,POST_JOIN,GET_USERS } from '../modules/UserModule';
import { Cookies } from "react-cookie";

const cookies = new Cookies();
const COOKIE_NAME = 'accessToken';

export const callLoginAPI = ({form}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8000/login`;

    return async (dispatch, getState) => {

        try {
            const result = await fetch(requestURL, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "*/*",
                  "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                  id: form.id,
                  pwd: form.pwd,
                })
              })
              .then(response => response.json());

              console.log('[UserAPICalls] callLoginAPI RESULT : ', result);

              if (result.status === 200) {
                cookies.set(COOKIE_NAME, result.data.accessToken, { path: '/' });
              }

              dispatch({type: POST_LOGIN, payload: result});
            
        } catch (error) {
            console.error('[UserAPICalls] callLoginAPI Error:', error.message);            
        }
        
    };
};

export const callLogoutAPI = () => {

    return (dispatch) => {
        cookies.remove(COOKIE_NAME, { path: '/' });
    
        dispatch({ type: POST_LOGIN, payload: '' });
        console.log('[UserAPICalls] callLogoutAPI RESULT : SUCCESS');
      };
};

export const callJoinAPI = (userData) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8000/join`;

    return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "*/*",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
        //   id: id,
        //   pwd: pwd,
        }),
      });

  };
};
  
  export const callGetUserAPI = () => {
    // 사용자 목록 가져오기 API 호출 및 로직 작성
  };


