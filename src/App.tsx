import {
  IonApp,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
  setupIonicReact
} from '@ionic/react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { useState } from 'react';
import ChatComponent from './components/ChatComponent';
import DetailsForm from './components/DetailsForm';
import { io } from 'socket.io-client';
import { personCircleOutline } from 'ionicons/icons';

setupIonicReact();

const socket = io() // for web
// const socket = io() // for mobile, provide the url of the server


const App: React.FC = () => {
  
  const [ username, setUsername] = useState<string>('');


  return(
  <IonApp>
    <IonHeader>
      <IonToolbar color='dark'>
        <IonTitle size='large' className='ion-text-center ion-padding-top'>
          Chato-app
        </IonTitle>
        {
          username.length>0 && 
          <div className='ion-text-center ion-padding'>
              <IonIcon icon={personCircleOutline}> </IonIcon>
              {username}
          </div>
        }
      </IonToolbar>
    </IonHeader>

    { 
      username.length>0 && 
      <ChatComponent username={username} socket={socket} >
      </ChatComponent>
    }
    {
      username.length===0 &&
      <DetailsForm setUsername={setUsername} socket={socket} >
      </DetailsForm>
    }
  </IonApp>
  )
  };

export default App;
