import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { callReportRegistAPI } from "../../apis/ReportAPICalls";
import { useNavigate } from "react-router-dom";
import ButtonCSS from '../../styles/Button.module.css'
import ReportCSS from '../../styles/report/ReportCSS.module.css';
import modalCSS from '../../styles/Modal.module.css'
import { jwtDecode } from "jwt-decode";
import { getCookie } from "../../modules/CookieModule";

function Report({ nickName, productCode, sellStatus, productName, setModalOpen }) {

    // 모달창 끄기 버튼
    const closeModal = () => {
        setModalOpen(false);
    };
    // 모달 외부 클릭시 끄기
    // Modal창을 useRef 관리
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // 이벤트 핸들러 함수
        const handler = () => {
            // mousedown 이벤트가 발생한 영역이 모달칭이 아닐 때, 모달창 제거 
            if(modalRef.current && !modalRef.current.contains(Event.target)){
                setModalOpen(false)
            }
        };
    }, []
    );
    const seller = jwtDecode(getCookie("accessToken")).userName;
    console.log('유저 정보', seller);
    const navigate = useNavigate();

    // 리덕스를 이용하기 위한 디스 패처 셀렉터 선언
    const dispatch = useDispatch();

    const [reportForm, setReportForm] = useState({
        // reportUserNick: nickName,
        reportUserNick: seller,
        refReportCategoryNo: 0,
        productCode: productCode,
        reportComment: '',
        sellStatusCode: sellStatus
    });



    // form Data Set
    const onChangeHandler = (e) => {
        setReportForm({
            ...reportForm,
            [e.target.name]: e.target.value
        });
    }

    const onClickRegisterHandler = () => {
        console.log('[ReportRegisteration] onClickReportRegisterationHandler')

        const formData = new FormData();

        formData.append("reportUserNick", reportForm.reportUserNick);
        formData.append("refReportCategoryNo", reportForm.refReportCategoryNo);
        formData.append("productCode", reportForm.productCode);
        formData.append("reportComment", reportForm.reportComment);
        formData.append("sellStatusCode", reportForm.sellStatusCode);

        // console.log("bbbbb", formData);
        // console.log('[ReportRegist] fromData reportUserNick : ', formData.get('reportUserNick'));
        // console.log('[ReportRegist] fromData refReportCategoryNo : ', formData.get('refReportCategoryNo'));
        // console.log('[ReportRegist] fromData productCode : ', formData.get('productCode'));
        // console.log('[ReportRegist] fromData reportComment : ', formData.get('reportComment'));
        // console.log('[ReportRegist] fromData sellStatusCode : ', formData.get('sellStatusCode'));
        // console.log("aaaa", formData);
        dispatch(callReportRegistAPI({
            form: formData
        }))
        alert('신고 접수가 완료되었습니다.')
        setModalOpen(false)
    }
    return (
        <>
            <div className={modalCSS.container}>
                <button onClick={closeModal} className={modalCSS.close}>X</button>
                <div>
                    <h2>신고하기</h2>
                    <hr />
                    <label>신고분류</label>
                    <select name="refReportCategoryNo" onChange={onChangeHandler}>
                        <option>선택해주세요.</option>
                        <option value={1}>광고성 컨텐츠에요</option>
                        <option value={2}>거래 금지 품목이에요</option>
                        <option value={3}>가품, 이미테이션제품이에요</option>
                        <option value={4}>사기가의심돼요</option>
                    </select>

                    <div>판매게시글 : {productName}</div>

                    <div>신고사유</div>
                    <textarea
                        name="reportComment"
                        onChange={onChangeHandler}
                        cols={40}
                        rows={5}
                        placeholder="신고 내용을 직접 작성해주세요. &#13;자세하게 적어주시면 신고처리에 큰 도움이 됩니다." />
                    <button className={ButtonCSS.smallBtn2} onClick={onClickRegisterHandler}>보내기</button>
                </div>
            </div>
        </>
    );

}
export default Report;