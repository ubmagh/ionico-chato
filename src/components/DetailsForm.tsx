import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonRow, IonTitle, useIonLoading, useIonAlert } from "@ionic/react";
import { arrowForwardCircle } from "ionicons/icons";
import './DetailsForm.css';
import { Socket } from "socket.io-client";
import { useRef, useState } from "react";
import randomColor from "randomcolor";



interface detailsFormParams {
    setUsername : ( username:string )=>any,
    socket : Socket,
    setColor : ( color:string )=>any,
}

const DetailsForm: React.FC<detailsFormParams> = ( { setUsername, socket, setColor } ) => {
    const [present, dismiss] = useIonLoading();
    const [ionAlert] = useIonAlert();
    const inputRef = useRef<HTMLIonInputElement>(null);
    let blocked= false;
    const [ localUsername, setLocalUsername] = useState('')


    const submitUsername = async ()=>{
        await present({
            message: "Checking username ...",
            keyboardClose: false,
            spinner: "crescent"
        })
        blocked = true;
        inputRef.current?.setAttribute('disabled', "true");
        socket.on('usernameTaken', async val=>{
            await dismiss();
            ionAlert({
                header: "username taken",
                message: "This username is already used by someone !",
                buttons: ['OK']
            })
            setLocalUsername('');
        })
        socket.on('usernameRegistred', async val=>{
            setUsername(localUsername)
            setColor( randomColor() );
            await dismiss();
        })
        socket.emit('setUsername', localUsername);
        inputRef.current?.removeAttribute('disabled');
        blocked = false;
    }

    return (
        <>
            <IonContent>
                <div className="mydiv" >
                    <IonGrid style={ {innerWidth:'100%', innerHeight: '100%'} }  >
                        <IonRow className="ion-justify-content-center ion-align-items-center">
                            <IonCol sizeMd="8" sizeLg="6" sizeXs="12">
                                    <IonCard>
                                        <IonCardHeader>
                                            <IonTitle className="ion-text-center">
                                                Enter your username to get in :
                                            </IonTitle> 
                                        </IonCardHeader>
                                        <IonCardContent>
                                            <IonItem className="ion-margin-bottom">
                                                <IonLabel position="floating" > username </IonLabel>
                                                <IonInput id="username" onIonChange={ (evnt)=>{ setLocalUsername( (evnt.target as HTMLInputElement).value.trim() ); } } ref={inputRef} ></IonInput>
                                            </IonItem>
                                            <div className="ion-text-center">
                                                <IonButton color="dark" onClick={submitUsername} disabled={localUsername.length===0 || blocked }>
                                                    <IonIcon icon={arrowForwardCircle} slot="start"></IonIcon>
                                                    Get in
                                                </IonButton>
                                            </div>
                                        </IonCardContent>
                                    </IonCard>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </div>
            </IonContent>
        </>
    );
}

export default DetailsForm;