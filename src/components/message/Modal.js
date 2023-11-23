import { useState } from "react";
import MessageList from "../../pages/message/MessageList";

function Modal(){
    const [modalOpen, setModalOpen] = useState(false);

    const showModal = () => {
        setModalOpen(true);
    };


    return (
        <div>
            {/* <button onClick={showModal}>모달 띄우기</button> */}
            {/* {modalOpen && <MeesageModal setModalOpen={setModalOpen} />} */}
            {modalOpen && <MessageList setModalOpen={setModalOpen} />}
        </div>
    );
}

export default Modal;