import { useEffect, useState, useSyncExternalStore } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callReportManagementAPI, callSearchReportAPI } from "../../apis/ReportAPICalls";
import { useNavigate, useParams } from "react-router-dom";
import modalCSS from '../../styles/Modal.module.css'
import ProcessDetail from "./ProcessDetail";
import ReportUpdate from './ReportUpdate';
import { getCookie } from "../../modules/CookieModule";
import { jwtDecode } from "jwt-decode";


function ProcessManagement() {
    const navigate = useNavigate();

    const [modalOpen, setModalOpen] = useState(false);

    const seller = jwtDecode(getCookie("accessToken")).userName;
    console.log('사용자정보', jwtDecode(getCookie("accessToken")));
    console.log('유저 코드', seller);

    const dispatch = useDispatch();
    const result = useSelector(state => state.reportReducer);
    const [selectedReportNo, setSelectedReportNo] = useState(null);

    console.log('1#$$$$$$$$$', selectedReportNo);


    const onClickProcessDetailHandler = (reportNo, processDistinction) => {
        // 처리 상세페이지 이동
        if (processDistinction !== "N") {
            setSelectedReportNo(reportNo)
            setModalOpen(true)
        } else {
            setSelectedReportNo(reportNo)
            setModalOpen(true)

        }
    }
    const [searchResult, setSearchResult] = useState(0);
    // 상태값 설정
    const [process, setProcess] = useState();


    useEffect(() => {
        if (process === 'Y') {
            setSearchResult(result.filter((result) => {
                return result.processDistinction === 'Y';
            }));
        } else {
            setSearchResult(result.filter((result) => {
                return result.processDistinction === 'N';
            }));
        }
    }, [process]);


    // Search setting
    const [search, setSearch] = useState('');

    const onSearchChangeHandler = (e) => {
        setSearch(e.target.value);
    }

    const onEnterKeyHandler = (e) => {
        if (e.key == 'Enter') {
            console.log('Enter key', search);

            navigate(`/search?value=${search}`, { replace: false });
            // dispatch(callSearchReportAPI ({
            //     search: search
            // }));
            // window.location.reload();
        }
    }
    useEffect(
        () => {
            dispatch(callReportManagementAPI({ // 처리 상세 조회
            }))
        },
        []
    );
    return (
        <>
            <div>
                <button onClick={() => setProcess('Y')}>처리</button>
                <button onClick={() => setProcess('N')}>미처리</button>
            </div>

            <input
                type="text"
                placeholder="검색"
                value={search}
                onKeyUp={onEnterKeyHandler}
                onChange={onSearchChangeHandler}
            />
            <table>
                <thead>
                    <tr>
                        <th>신고번호</th>
                        <th>신고자</th>
                        <th>판매자</th>
                        <th>판매게시글</th>
                        <th>신고분류</th>
                        <th>처리완료여부</th>
                    </tr>
                </thead>
                <tbody>
                    {process ? searchResult.map((report) => (
                        <tr key={report.reportNo}>
                            <td>{report.reportNo}</td>
                            <td>{report.reportUserNick}</td>
                            <td>{report.nickName}</td>
                            <td>{report.productName}</td>
                            <td>{report.reportCategoryCode}</td>
                            <button onClick={() => onClickProcessDetailHandler(report.reportNo, report.processDistinction)}>
                                <td>{report.processDistinction}{modalOpen && <modalCSS setModalOpen={setModalOpen} />}</td>
                            </button>
                        </tr>
                    )) :
                        (Array.isArray(result) && result.map((report) => (
                            <tr key={report.reportNo}>
                                <td>{report.reportNo}</td>
                                <td>{report.reportUserNick}</td>
                                <td>{report.nickName}</td>
                                <td>{report.productName}</td>
                                <td>{report.reportCategoryCode}</td>
                                <button onClick={() => onClickProcessDetailHandler(report.reportNo, report.processDistinction)}>
                                    <td>{report.processDistinction}{modalOpen && <modalCSS setModalOpen={setModalOpen} />}</td>
                                </button>
                            </tr>
                        )))}
                </tbody>
            </table>
            {modalOpen && <ProcessDetail reportNo={selectedReportNo} setModalOpen={setModalOpen}/>}
        </>
    )
}

export default ProcessManagement;

