import { useNavigate } from "react-router-dom";

function ReportSearch({ report: { reportNo, reportUserNick, productCode, refReportCategoryNo, processDistinction } }) {

    const navigate = useNavigate();

    const onClickReportHandler = (reportNo) => {
        navigate(`/process/${reportNo}`, { replace: false });
    }
    console.log('리포트서치 페이지 뭐가 잘못됐니 ? : ', reportNo, reportUserNick, productCode.productName, refReportCategoryNo.reportCategoryCode, processDistinction)
    return (
        <div
            onClick={() => onClickReportHandler(reportNo)}
        >
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
                    <tr>
                        <td>{reportNo}</td>
                        <td>{reportUserNick}</td>
                        <td>판매자 props</td>
                        <td>{productCode.productName}</td>
                        <td>{refReportCategoryNo.reportCategoryCode}</td>
                        <td>{processDistinction}</td>
                    </tr>
                </tbody>
            </table>
        </div >

    );
}
export default ReportSearch;