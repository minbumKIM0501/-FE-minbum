import React, { useState, useEffect } from 'react';
import WishListCSS from '../../styles/wishList/WishList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { callGetMyProductListAPI } from '../../apis/MyProductAPICalls';
import { fetchMyProductListStart, fetchMyProductListSuccess, fetchMyProductListFailure } from '../../modules/SellingListModule';
import { useNavigate } from 'react-router-dom';
import { onClickItemDetail } from '../../modules/ProductModule';
import PagingBar from '../../components/common/PagingBar';

function MyProductList() {
    const dispatch = useDispatch();
    const [myProductList, setMyProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const PagingInfo = useSelector(state => state.pagingReducer);
    const navigate = useNavigate();

    const onChangeSellStatus = async (code, event) => {
        const updatedStatus = event.target.value;
        try {
            // 서버에 판매 상태 업데이트 요청
            // callUpdateSellStatusAPI(code, updatedStatus);


            const updatedProductList = myProductList.sellingList.map(product =>
                product.productCode === code ? { ...product, sellStatus: updatedStatus } : product
            );
            setMyProductList({ ...myProductList, sellingList: updatedProductList });
        } catch (error) {
            // 오류 처리
        }
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const productList = await callGetMyProductListAPI();
                setMyProductList(productList);
                setLoading(false);

                // Redux 액션 dispatch
                dispatch(fetchMyProductListSuccess(productList));
            } catch (error) {
                setError('상품 목록을 불러오는 중 에러가 발생했습니다.');
                setLoading(false);
                dispatch(fetchMyProductListFailure(error.message));
            }

            console.log(myProductList);
        }

        dispatch(fetchMyProductListStart());
        fetchData();
    }, [dispatch, PagingInfo]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const onclickHandler = (code) => {
        navigate(`/usedProduct/${code}`)
    }

    function getStatusString(sellStatus) {
        return sellStatus === 1 ? '판매중' : '판매완료';
    }

    const pagingBtn = myProductList && myProductList.pagingBtn;


    return (
        <div>
            <div>
                {myProductList.sellingList.length === 0 ? (
                    <div>등록된 상품이 없습니다.</div>
                ) : (
                    <>
                        <table>
                            <colgroup>
                                <col className={WishListCSS.colWidth25} />
                                <col className={WishListCSS.colWidth10} />
                                <col className={WishListCSS.colWidth20} />
                                <col className={WishListCSS.colWidth10} />
                                <col className={WishListCSS.colWidth20} />
                                <col className={WishListCSS.colWidth15} />
                            </colgroup>
                            <tr>
                                <th>등록번호</th>
                                <th>사진</th>
                                <th>상품명</th>
                                <th>가격</th>
                                <th>관심</th>
                                <th>상태</th>
                            </tr>
                            {console.log(myProductList)}
                            {myProductList && myProductList.sellingList.map(product => (
                                <tr key={product.productCode}>
                                    <td>
                                        <div onClick={() => onclickHandler(product.productCode)}>
                                            {product.productCode}
                                        </div>
                                    </td>
                                    <td>
                                        <div onClick={() => onclickHandler(product.productCode)}>
                                            <img src={product.image} alt="상품 이미지" />
                                        </div>
                                    </td>
                                    <td>
                                        <div onClick={() => onclickHandler(product.productCode)}>
                                            {product.productName}
                                        </div>
                                    </td>
                                    <td>
                                        <div onClick={() => onclickHandler(product.productCode)}>
                                            {product.productPrice}
                                        </div>
                                    </td>
                                    <td>
                                        <div onClick={() => onclickHandler(product.productCode)}>
                                            {product.wishCount}
                                        </div>
                                    </td>
                                    <td>
                                        <select value={product.sellStatus} onChange={(e) => onChangeSellStatus(product.productCode, e)}>
                                            <option value="판매중">판매중</option>
                                            <option value="판매완료">판매완료</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </table>
                        <PagingBar pagingBtn={pagingBtn} />
                    </>
                )}
            </div>
        </div>
    );
}
export default MyProductList;
