import { Outlet } from "react-router-dom";
import SubHeader from "../components/common/SubHeader";


function SubHeaderLayout() {
    return (
        <>
            <SubHeader/>
            <Outlet/>
        </>
    )
}

export default SubHeaderLayout;