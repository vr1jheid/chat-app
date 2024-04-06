import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { currentUserState } from "./redux/slices/currentUser";
console.log("Firebase initialized");

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRJS5o3pH2nEJC5GMZc4Ng-fejgKO1Eik",
  authDomain: "my-test-project-c16e1.firebaseapp.com",
  projectId: "my-test-project-c16e1",
  storageBucket: "my-test-project-c16e1.appspot.com",
  messagingSenderId: "1049999159587",
  appId: "1:1049999159587:web:0f9faba39f03411b98dc96",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();

type Dispatcher = (user: currentUserState | null) => void;

export const activateUserObserver = (onChange: Dispatcher) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userData: currentUserState = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        avatarURL: user.photoURL,
        isLoaded: true,
      };

      onChange(userData);
      console.log("user from watcher", user);
    } else {
      onChange(null);
      console.log("Нет юзера");
    }
  });
};
