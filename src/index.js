import React from 'react';
import ReactDOM from 'react-dom';

import firebase from 'firebase';

import App from './App';
import './index.css';

firebase.initializeApp({
    apiKey: "AIzaSyCyrWlCYR0aevINBcCVOVi_oo1Khk1o5Dw",
    authDomain: "drarekam.firebaseapp.com",
    databaseURL: "https://drarekam.firebaseio.com",
    projectId: "drarekam",
    storageBucket: "drarekam.appspot.com",
    messagingSenderId: "166870839375"
  });

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
