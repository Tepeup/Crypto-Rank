import firebase from "firebase/app";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyCSjpiBDu735ZpnDZvFYionz4nLu4IiV_k",
  authDomain: "crypto-rank.firebaseapp.com",
  projectId: "crypto-rank",
  storageBucket: "crypto-rank.appspot.com",
  messagingSenderId: "485635573971",
  appId: "1:485635573971:web:e6b429e2de300821242c26",
  measurementId: "G-VP25MXZRF5",
};
if (firebase.apps.length === 0) {
  firebase.initializeApp(config);
}
export const firestore = firebase.firestore();

export default firebase;
