import { NavLink } from "react-router-dom";
import SubHeaderCSS from '../../styles/SubHeader.module.css';

function SubHeader() {


    return (
        <>  
            <div className={SubHeaderCSS.subHeaderLayout}>
                <div className={SubHeaderCSS.subHeaderContainter}>
                    <div className={SubHeaderCSS.subHeaderItem}>
                        <NavLink className={({isActive}) => isActive? SubHeaderCSS.subHeaderBorderActive : SubHeaderCSS.subHeaderBorder} to="/myPage/wishList1" style={{ textDecoration: "none" }}><div>내 정보</div></NavLink>
                    </div>
                    <div className={SubHeaderCSS.subHeaderItem}>
                        <NavLink className={({isActive}) => isActive? SubHeaderCSS.subHeaderBorderActive : SubHeaderCSS.subHeaderBorder} to="/myPage/myproductlist" style={{ textDecoration: "none" }}><div>판매목록</div></NavLink>
                    </div>
                    <div className={SubHeaderCSS.subHeaderItem}>
                        <NavLink className={({isActive}) => isActive? SubHeaderCSS.subHeaderBorderActive : SubHeaderCSS.subHeaderBorder} to="/myPage/wishList" style={{ textDecoration: "none" }}><div>관심목록</div></NavLink>
                    </div>
                    <div className={SubHeaderCSS.subHeaderItem}>
                        <NavLink className={({isActive}) => isActive? SubHeaderCSS.subHeaderBorderActive : SubHeaderCSS.subHeaderBorder} to="/myPage/wishList1" style={{ textDecoration: "none" }}><div>1:1 문의</div></NavLink>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SubHeader;