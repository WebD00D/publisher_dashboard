
import firebase from 'firebase'

var production = {
  apiKey: "AIzaSyCO99WM-4YXykyht60i7rjTOAQOdmy7o7M",
  authDomain: "the-library-1a359.firebaseapp.com",
  databaseURL: "https://the-library-1a359.firebaseio.com",
  projectId: "the-library-1a359",
  storageBucket: "the-library-1a359.appspot.com",
  messagingSenderId: "147199364885"
  };

var dev = {
    apiKey: "AIzaSyD2d0ky9h8vTRPijjfxtQs5iUOKsoMiYF0",
    authDomain: "library-dev-1ccef.firebaseapp.com",
    databaseURL: "https://library-dev-1ccef.firebaseio.com",
    projectId: "library-dev-1ccef",
    storageBucket: "",
    messagingSenderId: "947409743016"
}

var fire = firebase.initializeApp(dev);
export default fire;
