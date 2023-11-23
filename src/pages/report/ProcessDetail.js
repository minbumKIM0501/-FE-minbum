import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callReportDetailAPI } from "../../apis/ReportAPICalls";
import modalCSS from '../../styles/Modal.module.css';

function ProcessDetail({ reportNo, setModalOpen }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const processDetail = useSelector(state => state.reportReducer);
    const process = processDetail.data;

    console.log('1#######', reportNo);

    
    // 모달창 끄기 버튼
    const closeModal = () => {
        setModalOpen(false);
    };

    useEffect(
        () => {
            console.log(reportNo)
            dispatch(callReportDetailAPI({ // 신고처리 상세내역
                reportNo: reportNo
            }));
            
        },
        []
    );

            console.log('djfpdjfpdfjkdp', processDetail)
    return (
        <>

        <div>여기 오나 ?</div>
            {processDetail &&
            <div className={modalCSS.container}>
                <button className={modalCSS.close} onClick={closeModal}>X</button>
                <div>
                    <div>신고처리</div>
                    <div>No : {processDetail.reportNo}</div>
                    <div>접수일시 : {processDetail.reportDate}</div>
                    <hr />
                    <div>
                        <div>신고분류 : {processDetail.reportCategoryCode}</div>
                        <div>판매게시글 : {processDetail.productName}</div>
                        <div>처리일시 : {processDetail.processDate}</div>
                        <div>신고처리 결과 : {processDetail.sellStatus}</div>
                        <div>신고사유 </div>
                        <hr />
                        <div>{processDetail.reportComment}</div>
                        <div>신고처리내용 : </div>
                        <hr />
                        <div>{processDetail.processComment}</div>
                    </div>
                </div>
            </div>}
            <div className={modalCSS.container}>
                <button className={modalCSS.close} onClick={closeModal}>X</button>
                <div>
                    <div>신고처리</div>
                    <div>No : {processDetail.reportNo}</div>
                    <div>접수일시 : {processDetail.reportDate}</div>
                    <hr />
                    <div>
                        <div>신고분류 : {processDetail.reportCategoryCode}</div>
                        <div>판매게시글 : {processDetail.productName}</div>
                        <div>처리일시 : {processDetail.processDate}</div>
                        <div>신고처리 결과 : {processDetail.sellStatus}</div>
                        <div>신고사유 </div>
                        <hr />
                        <div>{processDetail.reportComment}</div>
                        <div>신고처리내용 : </div>
                        <hr />
                        <div>{process.processComment}</div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default ProcessDetail;