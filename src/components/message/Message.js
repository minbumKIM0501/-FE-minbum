import { useState } from "react";
import MessageMenu from "./MessageMenu";
import MessageList from "../../pages/message/MessageList";




function Message(){
    const [isReceived, setIsReceived] = useState(true);

    console.log("Message")

    const handleMenuClick = (isReceived) => {
        setIsReceived(isReceived);
    }


    return(
        <>
            <MessageMenu onMenuClick={handleMenuClick} />
            <MessageList isReceived={isReceived} />
        </>
    )
}

export default Message;