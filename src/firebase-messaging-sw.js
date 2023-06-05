import { getMessaging } from "firebase/messaging/sw";
import { onBackgroundMessage } from "firebase/messaging/sw";
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseConfig = {
  apiKey: "AIzaSyCBlBY6SAyjlPndFJ_33fLcVod7Apfzw2Y",
  authDomain: "rosenrotation.firebaseapp.com",
  projectId: "rosenrotation",
  storageBucket: "rosenrotation.appspot.com",
  messagingSenderId: "929477218299",
  appId: "1:929477218299:web:d42e2036cca5089cd2055e",
  measurementId: "G-N5E888Y0EH"
};
const app = initializeApp(firebaseConfig);
// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = getMessaging(app);

onBackgroundMessage(messaging, (payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
