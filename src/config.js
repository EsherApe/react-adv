import firebase from 'firebase';

export const appName = 'react-adv-311db';
export const fireBaseConfig = {
  apiKey: "AIzaSyBp3K-rnu3LWBtUxtvZ6AkeCbmfC6g51TY",
  authDomain: `${appName}.firebaseapp.com`,
  databaseURL: `https://${appName}.firebaseio.com`,
  projectId: `${appName}`,
  storageBucket: `${appName}.appspot.com`,
  messagingSenderId: "252654945030"
};

firebase.initializeApp(fireBaseConfig);