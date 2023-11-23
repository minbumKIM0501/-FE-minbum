import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../styles/Button.module.css"
import { useEffect, useState } from "react";
import { callReportUpdateAPI, callReportDetailAPI } from "../../apis/ReportAPICalls";
import { callMessagesRegistAPI } from "../../apis/ProductAPICalls";
import { getCookie } from "../../modules/CookieModule";
import modalCSS from "../../styles/Modal.module.css"

function ReportUpdate({ reportNo, setModalOpen }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const processList = useSelector(state => state.reportReducer);
    const process = processList.data;

    console.log(setModalOpen);
    const closeModal = () => {
        setModalOpen(false);
    }
    useEffect(
        () => {
            dispatch(callReportDetailAPI({ // 신고처리 상세내역
                reportNo: params.reportNo
            }));
        },
        []
    );

    // 셋팅할 준비
    const [form, setForm] = useState({
        processDistinction: '',
        processComment: '',
        sellStatusCode: 0
    });

    // form setting
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const onClickReportUpdateHandler = () => {
        console.log('[ReportUpdate] onClickReportUpdateHcdcdcdcdcdcdcdcdcdcdandler');

        const formData = new FormData();
        formData.append("reportNo", params.reportNo);
        formData.append("processComment", form.processComment);
        formData.append("sellStatusCode", form.sellStatusCode);

        dispatch(callReportUpdateAPI({
            form: formData
        }));

        navigate(`/admin`, { replace: false });
    }




    // 신고처리에 대한 쪽지 발송
    const onClickSendMsg = () => {

        dispatch(callMessagesRegistAPI())

    }



    return (
        (process &&
            <>
                <div className={modalCSS.container}>
                    <button className={modalCSS.close} onClick={closeModal}>X</button>
                    <div>신고처리</div>
                    <div>No: {process.reportNo}</div>
                    <div>접수일시 : {process.reportDate}</div>
                    <hr />
                    <div>신고분류 : {process.refReportCategoryNo.reportCategoryCode}</div>
                    <div>신고된게시글 : {process.productCode.productName}</div>
                    <div>신고사유</div>
                    <hr />
                    <div>신고내용 : {process.reportComment}</div>
                    <div>신고처리 내용</div>
                    <select name="sellStatusCode" onChange={onChangeHandler}>
                        <option>선택하세요.</option>
                        <option value={4} >게시글삭제</option>
                        <option value={3}>반려</option>
                    </select>
                    <textarea cols="40" rows="2" name="processComment" onChange={onChangeHandler}></textarea>
                    <button className={Button.smallBtn2} onClick={onClickReportUpdateHandler} >완료</button>
                </div>
            </>
        )
    );

}

export default ReportUpdate;