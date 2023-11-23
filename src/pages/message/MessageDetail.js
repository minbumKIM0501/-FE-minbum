import { useParams } from 'react-router-dom';
import{callMessageDetailAPI} from '../../apis/MessageAPICalls'
import { callMessageRegistAPI } from '../../apis/MessageAPICalls';
import {useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import ButtonCSS from '../../styles/Button.module.css';
import MessageMenu from '../../components/message/MessageMenu';
import MessagDetailCSS from '../../styles/message/MessageDetail.module.css'





function MessageDetail({msgCode}){
    const messageInfos = useSelector(state => state.messageReducer);
    const PagingInfo = useSelector(state => state.pagingReducer);
    const dispatch = useDispatch();
    const params = useParams();

    const [messageDetail, setMessageDetail] = useState([]);
    const [replyContent, setReplyContent] = useState('');
    const [isReadOnly, setIsReadOnly] = useState(true);

    const memoizedMessageMenu = useMemo(() => <MessageMenu />, []);

    const [form, setForm] = useState({
        msgCode: 0,
        msgContent:'',
        msgStatus:'',
        msgTime:'',
        refProductCode: 0,
        senderCode: 0,
        receiverCode: 0,
        msgDeleteCode: 0,
        msgDeleteStatus:'',
    });


    const onChangeHandler = (e) => {
        if(!isReadOnly){
            setReplyContent(e.target.value)
        }
        setForm({
            ...form,
            replyContent,
            [e.target.name]: e.target.value
        });
    }
        useEffect(
        () => {
            dispatch(callMessageDetailAPI({
                msgCode: params.msgCode
            
            })).then((result) => {
                console.log("result============================" + result)
                if(result && result.data) {
                   // const iterableData = Array.isArray(result.data) ? result.data : [result.data];
                    setMessageDetail([...result.data]);
           
                    console.log("MessageDetail==========" + messageDetail)
                  
                }else{
                    console.log('[MessageDetail] API response does not contain data: ', result);

                }
            }).catch((error) => {
                console.error('[MessageDetail] API call error:', error);
            })
        },[PagingInfo, dispatch, msgCode]
    );

    const handleReplyClick = async () => {

        // console.log("=================form0 ================" + form);
        // console.log("msgCode: " +  form.msgCode);
        // console.log("msgContent: " +  form.msgContent);
        // console.log("msgStatus: " +  form.msgStatus);
        // console.log("msgTime: " +  form.msgTime);
        // console.log("refProductCode: " +  form.refProductCode);
        // console.log("senderCode: " +  form.senderCode);
        // console.log("receiverCode: " +  form.receiverCode);
        // console.log("msgDeleteCode: " +  form.msgDeleteCode);
        // console.log("msgDeleteStatus: " +  form.msgDeleteStatus);


        const formData = new FormData();
        formData.append("msgCode", form.msgCode);
        formData.append("msgContent", form.msgContent);
        formData.append("msgStatus", form.msgStatus);
        formData.append("msgTime", form.msgTime);
        console.log("refProductCode================" + form.refProductCode)
        formData.append("refProductCode", form.refProductCode);
        formData.append("senderCode", form.senderCode);
        formData.append("receiverCode", form.receiverCode);
        formData.append("msgDeleteCode", form.msgDeleteCode);
        formData.append("msgDeleteStatus", form.msgDeleteStatus);


        if(isReadOnly){
            setReplyContent('');
            setIsReadOnly(!isReadOnly);
        } else{
            console.log(!isReadOnly)
            dispatch(callMessageRegistAPI({
                form: formData 
            }))
            setIsReadOnly(!isReadOnly);
        }
        

    }

  

    // useEffect(
    //     () => {
    //         if(!isReadOnly){
    //             dispatch(callMessageRegistAPI({
                    
    //             }))
    //         }
           
    //     },[isReadOnly, dispatch]
    // )

return(
    <>
        <div className={`${MessagDetailCSS.msgDetail}`}>
            <h3 className={`${MessagDetailCSS.pageTitle}`}>쪽지함</h3>
            <div className={`${MessagDetailCSS.msgNav}`} style={{marginTop: '5%'}}>
                 {memoizedMessageMenu}
            </div>
         <div className={`${MessagDetailCSS.contBox}`}>

         <div className={`${MessagDetailCSS.msgInfo}`}>
            {messageDetail && messageDetail[0] && ( 
                <ul key={messageDetail[0].msgCode}>
                <li>보낸 사람 &nbsp;&nbsp;&nbsp;&nbsp;<span>{`${messageDetail[0].name} ${messageDetail[0].id}`}</span></li>
                <li>수신 일시 &nbsp;&nbsp;&nbsp;&nbsp;<span>{messageDetail[0].msgTime}</span></li>
                <li>게시글 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{`${messageDetail[0].productName || ''} ${messageDetail[0].productDesc || ''}`}</span></li>
                </ul>
            )}
        </div>
            <hr/>

            {messageDetail && messageDetail[0] && ( 
            <div className={`${MessagDetailCSS.textAreaBox}`}>
                <div key={messageDetail.msgCode} className={`${MessagDetailCSS.titleMid}`} style={{marginBottom : '10px'}}>내용</div>
                <textarea 
                    style={{color : '#9D9D9D', border: isReadOnly ? 'none' : '1px solid #ccc'}} 
                    className={`${MessagDetailCSS.textArea}`}
                    placeholder="내용을 입력해주세요(최대 1500자)"
                    value={isReadOnly ? messageDetail[0].msgContent : replyContent}
                    onChange={onChangeHandler}
                    readOnly={isReadOnly}
                    name='msgContent'
                    >
                    {/* {messageDetail[0].msgContent} */}
                </textarea>
            </div>
            )}

            <input 
                type="submit" 
                value={isReadOnly ? '답장' : '보내기'} 
                className={`${ButtonCSS.middleBtn2}`} 
                style={{float : 'right', marginTop : '50px'}}
                onClick={handleReplyClick}
            />
          </div>


        </div>
    </>

);


};

export default MessageDetail;