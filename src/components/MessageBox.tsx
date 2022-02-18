import { useRef } from 'react';
import { IonButton, IonCol, IonFab, IonGrid, IonIcon, IonItem, IonLabel, IonRow, IonTextarea } from '@ionic/react';
import './MessageBox.css';
import { sendOutline } from 'ionicons/icons'
import chatDetails from '../types/chatDetails';





const MessageBox: React.FC<chatDetails> = ( { username, socket } ) => {
  
  const message = useRef<HTMLIonTextareaElement>(null);

  const sendMessage = ()=>{
    socket.emit('message', { sender: username, message: message.current!.value});
    document.getElementById('message')!.innerText = ""
  }


  return (
    <IonGrid>
      <IonRow>
        <IonCol size='12' sizeMd='' className='ion-margin-bottom'> 
          <IonItem>
            <IonLabel position="floating"> Enter your message here </IonLabel>
            <IonTextarea autofocus={true} maxlength={300} id="message" ref={message}>
            </IonTextarea>
          </IonItem>
        </IonCol>
        <IonCol size='12' sizeMd='2' sizeXl='1' className='ion-margin-top' >
          <IonFab vertical='center' horizontal='center' >
            <IonButton onClick={sendMessage}>
              <IonIcon slot='start' icon={sendOutline} ></IonIcon>
              Send
            </IonButton>
          </IonFab>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default MessageBox;
