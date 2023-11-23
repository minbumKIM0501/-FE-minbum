import queryString from "query-string";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { callSearchReportAPI } from "../../apis/ReportAPICalls";
import ReportManagement from "./ProcessManagement";
import ReportSearch from "./ReportSearch";

function Search() {
    const { search } = useLocation();
    const { value } = queryString.parse(search);

    const reports = useSelector(state => state.reportReducer);

    const dispatch = useDispatch();

    console.log('여기 오나요 ? : ' , search)

    useEffect(() => {
        dispatch(callSearchReportAPI({
            search: value
        }));
    }, []
    );

    return (
        <div>
            {
                reports.length > 0 && reports.map((report) => (<ReportSearch key={report.reportUserNick} report={report} />))
            }
        </div>
    );
}
export default Search;