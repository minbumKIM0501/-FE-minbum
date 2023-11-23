import MergeBoxCSS from '../../styles/product/MergeBox.module.css';
import ButtonCSS from '../../styles/Button.module.css';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GET_CATEGORY_CODE, GET_MERGE_ITEM, GET_RESET_FILTER, GET_RESET_MERGE_CATEGERY_ALL, GET_RESET_PRODUCT_CATEGERY, GET_SEARCH_AGAIN, priceToString } from '../../modules/ProductModule';
import { useDispatch, useSelector } from 'react-redux';
import { GET_PAGING } from '../../modules/PagingModule';
import MergeItemBox from './MergeItemBox';
import { callMessagesRegistAPI } from '../../apis/ProductAPICalls';

function MergeBox() {
    
    const [ money, setMoney ] = useState('');
    const [ remain, setRemain ] = useState('0');
    const [ selectedItemCount, setSelectedItemCount ] = useState('0');
    const [ selectedItem, setSelectedItem ] = useState([]);

    const getSearchAgain = useSelector(state => state.productReducer.searchAgain);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const onChangeHandler = e => {
        setMoney(e.target.value.replace(/[^0-9]/g, ''));
    }

    const usernameRef = useRef();

    useEffect(
        () => {
            usernameRef.current.focus();
            if(window.localStorage.getItem("burget") == 0) {
                setMoney("");
            } else {
                setMoney(window.localStorage.getItem("burget"));
            }
            setCalcRemain();
            if(window.localStorage.getItem("remainMoneySearch")) {
                window.localStorage.setItem("remainMoneySearch", 0);
            }
            dispatch({ type: GET_SEARCH_AGAIN, payload: 0});
        },[getSearchAgain]
    );

    function setCalcRemain() {
        let buyMoney = 0;
        if(window.localStorage.getItem("mergeKeys")) {
            window.localStorage.getItem("mergeKeys").split(",").map(
                mergeKey => buyMoney += JSON.parse(window.localStorage.getItem(mergeKey)).productPrice
            );
            window.localStorage.setItem("remainMoney", +window.localStorage.getItem("burget") - buyMoney);
        } else {
            window.localStorage.setItem("remainMoney", +window.localStorage.getItem("burget"));
        }
        setRemain(window.localStorage.getItem("remainMoney"));
    }

    let mergeItems = useSelector(state => state.productReducer.getMergeItem);
    
    useEffect(
        () => {
            dispatch({ type: GET_MERGE_ITEM, payload: 0});
            if(window.localStorage.getItem("mergeKeys")) {
                const mergeKeys = window.localStorage.getItem("mergeKeys").toString().split(",");
                const selectedItems = [];
                mergeKeys.map(
                    selectedItem => selectedItems.push(JSON.parse(window.localStorage.getItem(selectedItem)))
                )
                setSelectedItem(selectedItems);
                setSelectedItemCount(selectedItems.length);
            } else {
                setSelectedItem([]);
                setSelectedItemCount(0);
            }
            setCalcRemain();
        },[mergeItems == 1]
    );

    const onClickReset = () => {
        let isReset = window.confirm('초기화하시겠습니까?');
        if(isReset) {
            usernameRef.current.focus();
            window.localStorage.setItem("burget", '');
            window.localStorage.setItem("remainMoney", 0);
            window.localStorage.setItem("remainMoneySearch", 0);
            if(window.localStorage.getItem("mergeKeys")) {
                window.localStorage.getItem("mergeKeys").split(",").map(
                    mergeKey => window.localStorage.removeItem(mergeKey)
                );
                window.localStorage.removeItem("mergeKeys");
            }
            setMoney('');
            setRemain('0');
            setSelectedItem([]);
            setSelectedItemCount('0');
            navigate(``);
            dispatch({ type: GET_RESET_FILTER, payload: 1});
            dispatch({ type: GET_PAGING, payload: 1});
            dispatch({ type: GET_RESET_PRODUCT_CATEGERY, payload: 1});
            dispatch({ type: GET_RESET_MERGE_CATEGERY_ALL, payload: 1});
            dispatch({ type: GET_CATEGORY_CODE, payload: 0});
        }
    }

    function calcMoney() {
        window.localStorage.setItem("burget", +money);
        let buyMoney = 0;
        if(window.localStorage.getItem("mergeKeys")) {
            window.localStorage.getItem("mergeKeys").split(",").map(
                mergeKey => buyMoney += JSON.parse(window.localStorage.getItem(mergeKey)).productPrice
            );
            window.localStorage.setItem("remainMoney", +money - buyMoney);
        } else {
            window.localStorage.setItem("remainMoney", +money - buyMoney);
        }
        setRemain(+money - buyMoney);
        window.localStorage.setItem("remainMoneySearch", window.localStorage.getItem("remainMoney"));
        dispatch({ type: GET_SEARCH_AGAIN, payload: 1});

        const curURL = new URL(window.location.href);
        curURL.searchParams.set('page', 1);
        navigate(`${curURL.search}`);
        dispatch({ type: GET_PAGING, payload: 1});
    }

    const onClickSetMoney = () => {
        calcMoney();
    }

    const handleKeyPress = e => {
        if(e.key === 'Enter') {
            calcMoney();
        }
      }

    const sendMessagesResult = useSelector(state => state.productReducer.getMessagesResult);

    const onClickSendMsg = () => {
        if (window.localStorage.getItem("mergeKeys")) {
            if (+window.localStorage.getItem("remainMoney") < 0) {
                if (window.confirm("예산을 초과했습니다. 쪽지를 보내시겠습니까?")) {
                    sendMessages();        
                }
            } else if (window.confirm("쪽지를 보내시겠습니까?")) {
                sendMessages();            
            }
        } else {
            alert('쪽지를 보낼 상품을 없습니다.');  
        }
    }

    function sendMessages() {
        if (window.localStorage.getItem("mergeKeys")) {
            window.localStorage.getItem("mergeKeys").split(",").map(
                mergeKey => {
                    const productInfo = JSON.parse(window.localStorage.getItem(mergeKey));
                    dispatch(callMessagesRegistAPI(productInfo.productCode, productInfo.refUserCode));
                }
            );
        }
        alert('판매자들에게 쪽지를 보냈습니다.');
    }

    return(
        <>
            <div className={MergeBoxCSS.mergeBox0}>
            <div onClick={() => onClickReset()} className={MergeBoxCSS.resetBox}>
                 <img src="/images/reset.svg" alt=""/> <div className={MergeBoxCSS.resetBtn}>초기화</div>
            </div>
            <div className={MergeBoxCSS.mergeBox1}>
                <div className={MergeBoxCSS.setMoneyTitle}>예산 설정</div><button onClick={() => onClickSetMoney()} className={ButtonCSS.smallBtn2}>설정</button>
                <label>
                    <input className={MergeBoxCSS.setMoney} onChange={onChangeHandler} onKeyPress={handleKeyPress} value={money} placeholder="예산 설정" ref={usernameRef}/>
                </label>
            </div>
            <div className={MergeBoxCSS.mergeBox1}>
                <div>선택한 품목</div><div className={MergeBoxCSS.selectedItemNum}>{selectedItemCount}개</div>
            </div>
            <div className={MergeBoxCSS.mergeBox1}>
                <div>남은 예산</div><div className={MergeBoxCSS.remainPrice}>{priceToString(remain).replace("원","")}원</div>
            </div>
            <div className={MergeBoxCSS.mergeBox2}>
                {selectedItem.length !==0 ? selectedItem.map(selectedItem => 
                    <MergeItemBox selectedItem={selectedItem}/>
                ): ""}
            </div>
            <button onClick={onClickSendMsg} className={ButtonCSS.largeBtn}>쪽지 보내기</button>
            </div>
        </>
    );
}

export default MergeBox;