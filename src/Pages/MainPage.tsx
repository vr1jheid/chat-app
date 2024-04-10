import { Button } from "@mui/material";
import { auth, db } from "../firebase-config";
import { signOut } from "firebase/auth";
import Chat from "../Components/Chat";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

const MainPage = () => {
  const signOutUser = async () => {
    await signOut(auth);
    console.log("user signed out");
  };
  const getCurrentUser = () => {
    console.log(auth.currentUser);
  };

  const test = async () => {
    await setDoc(doc(db, "Test", "Time_test"), {
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className="w-full">
      <Button sx={{ fontWeight: 600 }} variant="outlined" onClick={signOutUser}>
        Sign out
      </Button>
      <Button
        sx={{ fontWeight: 600 }}
        variant="outlined"
        onClick={getCurrentUser}
      >
        Get current User
      </Button>
      <Button sx={{ fontWeight: 600 }} variant="outlined" onClick={test}>
        For Tests
      </Button>

      <Chat />
    </div>
  );
};

export default MainPage;
