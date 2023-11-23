import ModalCSS from '../../styles/message/Modal.module.css';




function MessageModal({setModalOpen}){

    const closeModal = () => {
        setModalOpen(false);
    }



    return(

        <>
            <div style={{position: 'relative'}}>
          
            
                <div className={`${ModalCSS.modalBg}`}></div>
                <div className={`${ModalCSS.modal}`}>
                
                    <div className={`${ModalCSS.modalBox}`}>
                    <button className={`${ModalCSS.modalClose}`} onClick={closeModal}><i className="xi-close-thin xi-2x"></i></button>
                
                    <h4 className={`${ModalCSS.modalTitle}`}>쪽지보내기</h4>
                
                    <div className={`${ModalCSS.modalContent}`}>
                        <ul>
                        <li>보내는 사람 &nbsp;&nbsp;&nbsp;&nbsp;<span> 이소망(dltha***)</span></li>
                        <li>받는 사람 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span> 김민범(bummy***)</span></li>
                        </ul>
                
                        <div className={`${ModalCSS.textAreaBox}`}>
                        <div className={`${ModalCSS.titleMid}`}>내용</div>
                        <textarea className={`${ModalCSS.textArea}`} placeholder="내용을 입력해주세요(최대 1500자)"></textarea>
                        </div>
                
                        <div className={`${ModalCSS.textCount}`}>0 / 1000 자</div>
                    </div>
                
                    <input type="submit" value="전송" className={`${ButtonCSS.smallBtn2}`}/>
                
                    </div>
                </div>
            
            
            </div>
        </>
       
        )
        
}


export default MessageModal;