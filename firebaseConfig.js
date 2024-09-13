import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: 'AIzaSyDw_943k3Ch9YebqavZrzU731GZz7-FEYA',
  authDomain: 'ibus-a0c38.firebaseapp.com',
  projectId: 'ibus-a0c38',
  storageBucket: 'ibus-a0c38.appspot.com',
  messagingSenderId: '1024434951875',
  appId: '1:1024434951875:web:fc74c9e666eb79b2033476',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };