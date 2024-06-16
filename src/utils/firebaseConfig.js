import { initializeApp, getApp } from "@react-native-firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDEEyVfC7WaPbk87W5ZTQTO6VxFbZO0hc4",
    authDomain: "assignment-t01.firebaseapp.com",
    projectId: "assignment-t01",
    storageBucket: "assignment-t01.appspot.com",
    messagingSenderId: "1051718902034",
    appId: "1:1051718902034:web:201ff6da01dc680de1d3cb",
    measurementId: "G-LFFKKPV48Y",
    databaseURL: 'https://assignment-t01-default-rtdb.asia-southeast1.firebasedatabase.app/',

};

// Initialize Firebase
let app = getApp();

if (!app) {
  app = initializeApp(firebaseConfig);
}
console.log(app)

export default app;
