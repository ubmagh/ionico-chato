import { IonCard, IonCardContent, IonCardHeader, IonGrid, IonItem, IonLabel, IonList, IonRow, IonText } from "@ionic/react";



interface MessageDetails {
    sender : string,
    message : string
};

const Message: React.FC<MessageDetails> = ( { sender, message } ) => {

    return (
    <>
        <IonCard style={ {border:"solid gray"}}>
            <IonCardHeader> 
                <IonLabel className="ion-text-bold">
                    <h4 style={ {color:"black", fontWeight:"bold"}}>
                        { sender } :
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