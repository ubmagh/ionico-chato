import { IonCard, IonCardContent, IonCardHeader, IonLabel, IonText } from "@ionic/react";



interface MessageDetails {
    sender : string,
    message : string, 
    color: string,
    currentUser: string
};

const Message: React.FC<MessageDetails> = ( { sender, message, color, currentUser } ) => {

    return (
    <>
        <IonCard style={ {border:"solid gray"}}>
            <IonCardHeader> 
                <IonLabel className="ion-text-bold">
                    <h4 style={ {color, fontWeight:"bold"}}>
                        { sender } { currentUser===sender && " (You) "}:
                    </h4>
                </IonLabel>
            </IonCardHeader>
            <IonCardContent>
                <IonText>
                    { message }
                </IonText>
            </IonCardContent>
        </IonCard>
    </>
    )

}

export default Message;