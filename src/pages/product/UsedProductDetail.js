import ProductDetailCSS from '../../styles/product/ProductDetailCss.module.css';
import ButtonCSS from '../../styles/Button.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callGetProductDetail, callWishListRegistAPI } from '../../apis/ProductAPICalls';
import { useNavigate, useParams } from 'react-router-dom';
import { GET_WISHLIST_AGAIN, priceToString, timeForToday } from '../../modules/ProductModule';
import { getCookie } from '../../modules/CookieModule';
import { callWishListDeleteAPI } from './../../apis/WishListAPICalls';
import { jwtDecode } from 'jwt-decode';
import UserProductDetailImg from './UserProductDetailImg';
import ReportCss from '../../styles/report/ReportCSS.module.css'
import Report from '../report/Report';
import modalCSS from '../../styles/Modal.module.css'

function UsedProductDetail() {

    const dispatch = useDispatch();
    const params = useParams();

    const productDetail = useSelector(state => state.productReducer.getProductDetail);
    const productDetailInfos = productDetail && productDetail.productDetail[0];
    const productDetailImg = productDetail && productDetail.selectedProductDetailImg;
    const wishListRegistNo = useSelector(state => state.productReducer.getWishListRegistResult);

    const [wishLishRegist, setWishLishRegist] = useState(0);
    const [plusMinusCount, setPlusMinusCount] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);


    useEffect(
        () => {
            dispatch(callGetProductDetail(params.productCode));
        },[]
    );

    useEffect(
        () => {
            if(productDetail && productDetail.selectedWishCode) {
                setWishLishRegist(productDetail.selectedWishCode[0] ? 1 : 0);
            }
        },[productDetail]
    );
    
    const onClickPickHandler = () => {
        if (getCookie("accessToken")) {
            if (wishLishRegist === 0) {
                dispatch(callWishListRegistAPI(params.productCode));
                if(plusMinusCount === 0) {
                    setPlusMinusCount(1);
                } else {
                    setPlusMinusCount(0);
                }
                setWishLishRegist(1);
            } else {
                dispatch(callWishListDeleteAPI(wishListRegistNo ? wishListRegistNo : productDetail.selectedWishCode[0]));
                
                if(plusMinusCount === 0) {
                    setPlusMinusCount(-1);
                } else {
                    setPlusMinusCount(0);
                }
                setWishLishRegist(0);
            }
            dispatch({ type: GET_WISHLIST_AGAIN, payload: 1});
        } else {
            alert("찜하려면 로그인 해야 합니다.");
        }
    }

    const onClickSendMessageHandler = () => {
        if (getCookie("accessToken")) {
            if(window.confirm("판매자에게 쪽지를 보내시겠습니까?")) {
                alert("쪽지 모달 + 판매자에게 쪽지를 보냈습니다.");
            }
        } else {
            alert("쪽지를 보내려면 로그인 해야 합니다.");
        }
    }

    // 모달창 노출 
    const onClickReportHandler = () => {
        if (getCookie("accessToken")) {
            setModalOpen(true);
        } else {
            alert("신고하려면 로그인 해야 합니다.");
        }
    }

    const navigate = useNavigate();

    const onClickHome = () => {
        navigate(`/`);
    }

    console.log(productDetail && productDetail)

    function Buyer() {
        return(
            <>
                <button onClick={onClickPickHandler} className={wishLishRegist === 1 ? ButtonCSS.middleBtn1 : ButtonCSS.middleBtn2}>{wishLishRegist === 1 ? "찜해제" : "찜하기"}</button>
                <button onClick={() => onClickSendMessageHandler()} className={ButtonCSS.middleBtn3}>쪽지 보내기</button>
            </>
        );
    }

    function Seller() {
        return(
            <>
                <button onClick={onClickRemoveHandler} className={ButtonCSS.middleBtn2}>삭제하기</button>
                <button onClick={onClickEditHandler} className={ButtonCSS.middleBtn3}>수정하기</button>
            </>
        );
    }

    const onClickRemoveHandler = () => {
        if(window.confirm("상품을 삭제하시겠습니까?")) {
            alert("상품을 삭제했습니다.");
        }
    }

    const onClickEditHandler = () => {
        navigate(`/productEdit`)
    }

    const onErrorImg = (e) => {
        e.target.src = "/images/home.svg";
    }

    function ProductDetailInfo() {
        return (
            <>
                <div className={ProductDetailCSS.productDetailContainer}>
                    <div className={ProductDetailCSS.productDetailBox}>
                        <div className={ProductDetailCSS.productDetailBox}>
                            <div className={ProductDetailCSS.productDirBox}>
                            <img onClick={() => onClickHome()} className={`${ProductDetailCSS.homeBtnCursor} ${ProductDetailCSS.productDirBtn}`}
                            src="/images/home.svg" height="24" alt=""/><div className={ProductDetailCSS.productDir1}>
                            <div className={ProductDetailCSS.productDirBtn}>&nbsp;홈&nbsp;</div>
                            <img className={ProductDetailCSS.productDir1} src="/images/categoryArrow.svg" height="15" alt=""/>
                                    <div className={ProductDetailCSS.productDirBtn}>&nbsp;{productDetailInfos.upperCategoryName}&nbsp;</div>
                            <img className={ProductDetailCSS.productDir1} src="/images/categoryArrow.svg" height="15" alt=""/>
                            <div className={ProductDetailCSS.productDirBtn}>&nbsp;{productDetailInfos.categoryName}&nbsp;</div>
                            </div>
                        </div>
                            <div className={ProductDetailCSS.productDetailBoth}>
                            <UserProductDetailImg productDetailImg={productDetailImg}/>
                            <div className={ProductDetailCSS.productDetailRight}>
                                <div className={ProductDetailCSS.productDetailName}>{productDetailInfos.productName}</div>
                                <div className={ProductDetailCSS.productDetailPriceBox}>
                                <div className={ProductDetailCSS.productDetailPrice}>{priceToString(productDetailInfos.productPrice).replace("원","")}</div><div className={ProductDetailCSS.productDetailWon}>원</div>
                                </div>
                                <div className={ProductDetailCSS.detailHr}></div>
                                <div className={ProductDetailCSS.statusAndReport}>
                                <div className={ProductDetailCSS.detailStatus}>
                                    <div className={ProductDetailCSS.productDetailEnrollDateTime}>{timeForToday(productDetailInfos.enrollDateTime)}</div>
                                    <div>&nbsp;·&nbsp;</div>
                                            <div className={ProductDetailCSS.productDetailViews}>조회 {productDetailInfos.viewCount}</div>
                                    <div>&nbsp;·&nbsp;</div>
                                    <div className={ProductDetailCSS.productDetailWish}>찜 {productDetailInfos.wishCount + plusMinusCount}</div>
                                </div>
                                <div  onClick={() => onClickReportHandler()} className={ProductDetailCSS.reportBtnBox}>
                                    <img src="/images/reportBtn.svg" alt=""/>&nbsp;
                                    <div className={`${ProductDetailCSS.reportContent} ${ReportCss.modalBox}`} >신고하기{modalOpen && <modalCSS setModalOpen={setModalOpen}/>}</div>
                                </div>
                                </div>
                                <div className={ProductDetailCSS.productDetailSellerHr}>판매자정보</div>
                                <div className={ProductDetailCSS.sellerInfoBox}>
                                <img src={productDetailInfos && productDetailInfos.userImageThumbAddr} alt="판매자 정보" className={ProductDetailCSS.sellerProfile} onError={onErrorImg}/>
                                <div className={ProductDetailCSS.sellerInfo}>
                                    <div className={ProductDetailCSS.sellerName}>{productDetailInfos.nickName}</div>
                                    {/* <div className={ProductDetailCSS.otherProduct}>판매자의 다른 상품 보기</div> */}
                                </div>
                                </div>
                                <div className={ProductDetailCSS.detailBtn}>

                                {getCookie("accessToken") && (jwtDecode(getCookie("accessToken")).userCode === productDetailInfos.refUserCode) ? <Seller/> : <Buyer/>}

                                </div>
                            </div>
                        </div>
                        <div className={ProductDetailCSS.productInfoAndPlace}>
                            <div className={ProductDetailCSS.productDetailInfoTitle}>상품 정보</div>
                            <div className={ProductDetailCSS.productDetailInfoContent}>{productDetailInfos.productDesc}</div>
                            <div className={ProductDetailCSS.wishPlaceToTraceTitle}>거래희망장소</div>
                            <div className={ProductDetailCSS.wishPlaceToTraceContent}>{productDetailInfos.wishPlaceTrade}</div>
                        </div>
                        </div>
                    </div>
                </div>
                {modalOpen && getCookie("accessToken") && < Report nickName={productDetailInfos.nickName} productCode={productDetailInfos.productCode} sellStatus={productDetailInfos.sellStatusCode} productName={productDetailInfos.productName} setModalOpen={setModalOpen} />}
            </>
        );
    }

    return (
        <>
            {productDetail && <ProductDetailInfo/>}
        </>
    );
}

export default UsedProductDetail;