import { Button } from "@mui/material";
import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";
import Chat from "../Components/Chat";

const MainPage = () => {
  const signOutUser = async () => {
    await signOut(auth);
    console.log("user signed out");
  };
  const getCurrentUser = () => {
    console.log(auth.currentUser);
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

      <Chat></Chat>
    </div>
  );
};

export default MainPage;
