import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { currentUserState } from "./redux/slices/currentUser";
import createUserData from "./utils/createUserData";
console.log("Firebase initialized");

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();

type Dispatcher = (user: currentUserState | null) => void;

export const activateUserObserver = (onChange: Dispatcher) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userData = createUserData(user);
      onChange({ ...userData, isLoaded: true });
      /*       console.log("user from watcher", user); */
    } else {
      onChange(null);
      console.log("Нет юзера");
    }
  });
};
