import { IonContent, IonFooter, IonToolbar } from "@ionic/react";
import { useRef, ReactDOM, useState } from "react";
import chatDetails from "../types/chatDetails";
import Message from "./Message";
import MessageBox from "./MessageBox";

const ChatComponent: React.FC<chatDetails> = ( { username, socket } ) => {
    let messagesContainer = useRef<HTMLDivElement>(null);
    let [ messages, setMessages] = useState<any[]>([]);
    socket.on('message', (message)=>{
        let messageObj = <Message message={message.message} sender={message.sender}></Message>;
        setMessages( [ ...messages, messageObj] );
    })
    return (
        <>
            <IonContent>
                <div className="MessagesContainer" id="MessagesContainer" ref={messagesContainer}>
                    {messages}
                </div>
            </IonContent>
            <IonFooter className='ion-padding'>
            <IonToolbar>
                <MessageBox username={username} socket={socket} >
                </MessageBox>
            </IonToolbar>
            </IonFooter>
        </>
    );
}


export default ChatComponent;