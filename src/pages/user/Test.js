import React from 'react';
import { CookiesProvider, useCookies  } from 'react-cookie';
import { jwtDecode as jwt_decode } from 'jwt-decode';

function Test() {
    const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);

  const token = cookies.accessToken;

  if (token) {
    console.log('Token:', token);

    // 토큰에서 정보를 추출하여 화면에 출력
    const userInfo = decodeToken(token);
    console.log('User Info:', userInfo);

    return (
      <div>
        <h1>토큰 정보 테스트</h1>
        <p>토큰: {token}</p>
        <p>디코딩된 사용자 정보:</p>
        <pre>{JSON.stringify(userInfo, null, 2)}</pre>
      </div>
    );
  } else {
    console.log('No token found.');
    return <div>No token found.</div>;
  }

  function decodeToken(token) {
    const decodedToken = jwt_decode(token);
    return decodedToken;
  }
}

export default Test;