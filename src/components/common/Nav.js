import { NavLink } from "react-router-dom";

function Nav() {

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        decoded = temp.auth[0];
    }
    return (
        <>
            <div>
                <div><NavLink to={"/"}>내정보</NavLink></div>
                <div><NavLink to={"/"}>판매목록</NavLink></div>
                <div><NavLink to={"/"}>관심 목록</NavLink></div>
                <div><NavLink to={"/"}>1:1문의</NavLink></div>
            </div>
        </>
    );
}
export default Nav;