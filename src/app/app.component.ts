import { Component, OnInit } from '@angular/core';
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'RR-APP';

  firebaseConfig = {
    apiKey: "AIzaSyCBlBY6SAyjlPndFJ_33fLcVod7Apfzw2Y",
    authDomain: "rosenrotation.firebaseapp.com",
    projectId: "rosenrotation",
    storageBucket: "rosenrotation.appspot.com",
    messagingSenderId: "929477218299",
    appId: "1:929477218299:web:d42e2036cca5089cd2055e",
    measurementId: "G-N5E888Y0EH"
  };

  app = initializeApp(this.firebaseConfig);
  messaging = getMessaging(this.app);

  ngOnInit(): void {
    // Add the public key generated from the console here.
    getToken(this.messaging, { vapidKey: "BM09JMQb4pwk0PklysvPsU9yoi7i6638xcU5Y_33qT0TwunVEKdB7FmcQVqvy-dIpvM604wXOwhYEsCgXdSGqW8" }).then((currentToken) => {
      if (currentToken) {
        // Send the token to your server and update the UI if necessary
        // ...
        console.log(currentToken);
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // ...
        this.requestPermission();
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // ...
    });

    onMessage(this.messaging, (payload) => {
      console.log('Message received. ', payload);
      // ...
    });
  }

  requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      }
    }).catch((err) => {
      console.log('Unable to get permission to notify.', err);
    });
  }
}
