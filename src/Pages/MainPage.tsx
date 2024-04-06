import { Button } from "@mui/material";
import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";

const MainPage = () => {
  const signOutUser = async () => {
    await signOut(auth);
    console.log("user signed out");
  };
  const getCurrentUser = () => {
    console.log(auth.currentUser);
  };

  return (
    <div>
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
    </div>
  );
};

export default MainPage;
