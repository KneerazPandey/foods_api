import admin from 'firebase-admin';
import serviceAccountKey from '../../../serviceAccountKey.json' assert {type: 'json'};

class FirebaseConnection {
    
    static connect() {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccountKey),
        });   
    }

}


export default FirebaseConnection;