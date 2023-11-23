import { NavLink, useNavigate } from "react-router-dom";
import { decodeJwt } from "../../utils/TokenUtils";
import { getCookie } from "../../modules/CookieModule";
import { jwtDecode } from "jwt-decode";

function AdminNav() {

    const navigate = useNavigate();



    const isLogin = getCookie("accessToken") && jwtDecode(getCookie("accessToken")).Role[0].toString().indexOf("ADMIN") !== -1;
    let decoded = null;

    if (isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        decoded = temp.auth[0];
    }

    const onClickReportHandler = () => {
        if (!isLogin) {
            navigate(`/`, { replace: true });
            alert("접근 불가능 합니다. 관리자에게 문의 해주세요")
        } else {
            navigate(`/processManagement`, { replace: true })
        }
    }
    return (
        <>
            <h2>나는 관리자 해더 시작</h2>
            <div><NavLink to="/">HOME</NavLink></div>
            <div onClick={onClickReportHandler}>신고관리</div>
            <div><NavLink to="/inquiry"> 문의관리</NavLink></div>
            <div>로그아웃</div>
            <h2>나는 관리자 해더 끝</h2>
        </>
    );
}

export default AdminNav;