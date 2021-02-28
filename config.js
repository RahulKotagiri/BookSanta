import firebase from 'firebase';
require("@firebase/firestore")

var firebaseConfig = {
  apiKey: "AIzaSyC0-5Fzl62WMoNTxB3t8zRKooTYBHWZCcw",
  authDomain: "book-santa-60a0c.firebaseapp.com",
  projectId: "book-santa-60a0c",
  storageBucket: "book-santa-60a0c.appspot.com",
  messagingSenderId: "495712257500",
  appId: "1:495712257500:web:687946ce2458cb079abb19"
  };
  firebase.initializeApp(firebaseConfig);
  
  export default firebase.firestore()