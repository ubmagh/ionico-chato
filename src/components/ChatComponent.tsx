import { IonContent, IonFooter, IonToolbar } from "@ionic/react";
import { useRef, useState } from "react";
import { Socket } from "socket.io-client";
import Message from "./Message";
import MessageBox from "./MessageBox";

interface chatComponentType {
    username: string,
    socket: Socket,
    color: string
}

const ChatComponent: React.FC<chatComponentType> = ( { username, socket, color } ) => {
    let messagesContainer = useRef<HTMLDivElement>(null);
    let [ messages, setMessages] = useState<any[]>([]);
    socket.on('message', (message)=>{
        let messageObj = <Message message={message.message} sender={message.sender} currentUser={username} color={message.color} ></Message>;
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
                <MessageBox username={username} socket={socket} color={color} >
                </MessageBox>
            </IonToolbar>
            </IonFooter>
        </>
    );
}


export default ChatComponent;