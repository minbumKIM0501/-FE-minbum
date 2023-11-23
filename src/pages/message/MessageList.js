

import { useNavigate, useParams } from 'react-router-dom';
import{
    callMessageListAPI
} from '../../apis/MessageAPICalls'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import PagingBar from '../../components/common/PagingBar';
import ButtonCSS from '../../styles/Button.module.css';
import MessageMenu from '../../components/message/MessageMenu';
import MessageListCSS from '../../styles/message/MessageList.module.css'

function MessageList({isReceived}){


    const navigate = useNavigate();
    const PagingInfo = useSelector(state => state.pagingReducer);
    const dispatch = useDispatch();
    const params = useParams();
    const messages = useSelector(state => state.messageReducer);
   // const messageList = messages.data;


    const [messageList, setMessageList] = useState([]);

    //let msgList = messages[0] ? messages[0].msgList : "";
    let pagingBtn = messages[0] ? messages[0].pagingBtn : "";

    const handleMessageClick = (msgCode) => {
        navigate(`/messageDetail/${msgCode}`);
    };
    
    


    useEffect(
        () => {
            dispatch(callMessageListAPI({
                userCode:1,
                isReceived: true,

            })).then((result) => {
                console.table("result : " + result);
                if(result && result.data){
                    setMessageList([...result.data]);
                }else{
                    console.error('[MessageList] API response does not contain data:', result);
                }
        
            }).catch((error) => {
                console.error('[MessageList] API call error:', error);
            })
        }
        ,[PagingInfo, dispatch, isReceived]
    );

    const handleMenuClick = (isReceived) => {
        // 메뉴 클릭에 대한 동작 정의
        if (isReceived === 'true') {
          // 받은 쪽지함 처리
          dispatch(callMessageListAPI({
            userCode: 1,
            isReceived: true,
          })).then((result) => {
            console.table("result : " + result);
            if(result && result.data){
                setMessageList([...result.data]);
            }else{
                console.error('[MessageList] API response does not contain data:', result);
            }
    
        }).catch((error) => {
            console.error('[MessageList] API call error:', error);
        })
    
        } else if (isReceived === 'false') {
          // 보낸 쪽지함 처리
          dispatch(callMessageListAPI({
            userCode: 1,
            isReceived: false,
          })).then((result) => {
            console.table("result : " + result);
            if(result && result.data){
                setMessageList([...result.data]);
            }else{
                console.error('[MessageList] API response does not contain data:', result);
            }
    
        }).catch((error) => {
            console.error('[MessageList] API call error:', error);
        })
    };
        }





    return (
        <>
            
            <h1>쪽지함</h1>
            <hr/>
            <div className={`${MessageListCSS.box1} ${MessageListCSS.contBox}`}>

                <div className={`${MessageListCSS.msgNav}`}>
                <MessageMenu onMenuClick={handleMenuClick} />
                </div>

                <div style={{float:'right'}}>
                    <div>
                        <form action='' method='get'>
                            <select className={`${MessageListCSS.search}`}>
                                <option value="전체">전체</option>
                                <option value="제목">제목</option>
                                <option value="이름">이름</option>
                                <option value="분류">분류</option>
                            </select>
                            <input type="search" placeholder="검색"/>
                            <input type="submit" value="검색"/>
                        </form>
                    
                 
                        <table>
                            <thead>
                            <tr>
                                <th className={`${MessageListCSS.text1}`}>
                                <input type="checkbox" name="sort" id="sort"/>
                                </th>
                                <th className={`${MessageListCSS.text1}`}>보낸사람</th>
                                <th className={`${MessageListCSS.text1}`}>내용</th>
                                <th className={`${MessageListCSS.text1}`}>수신일시</th>
                                <th className={`${MessageListCSS.text1}`}>수신확인</th>


                            </tr>
                            </thead>
                            <tbody className={`${MessageListCSS.msgTbody}`}>
                                {messageList && messageList.map(message => (
                                    <tr key={message.msgCode} onClick={() => handleMessageClick(message.msgCode)}>
                                        <td>
                                        <input type="checkbox" name="sort"/>
                                        </td>
                                        <td>{`${message.name} ${message.id}`}</td>
                                        <td>{message.msgContent}</td>
                                        <td>{message.msgTime}</td>
                                        <td>{message.msgStatus}</td>
                                    </tr>
                                ))}
                       
                            </tbody>
            
                        </table>

                        <input type="submit" value="삭제" className={`${ButtonCSS.middleBtn2}`} style={{float: 'right'}}/>

                        {messageList ? <PagingBar pagingBtn={pagingBtn}/> : ""}
          
                    </div>
          
                </div>   
            </div>
           
        </>
    );

}

export default MessageList;