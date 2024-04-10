import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Typography,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { selectUser } from "../redux/slices/currentUser";
import renderAvatar from "../utils/renderAvatar";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { useAppSelector } from "../redux/hooks";

const Header = () => {
  const currentUser = useAppSelector(selectUser);

  const signOutUser = async () => {
    await signOut(auth);
    console.log("user signed out");
  };

  return (
    <header className="p-4 px-10 bg-[#212121] text-white flex justify-between relative">
      {
        <h1 className="text-5xl font-medium inline-flex items-center">
          React Chat
        </h1>
      }
      <Accordion
        sx={{
          position: "absolute",
          right: "40px",
          backgroundColor: "#2c2c2c",
          color: "white",
          height: "fit-content",
        }}
      >
        <AccordionSummary sx={{ height: "fit-content" }}>
          <div className="flex items-center gap-3">
            {currentUser.displayName ?? currentUser.email}{" "}
            {renderAvatar(currentUser, 30)}
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <ul className=" text-xl flex flex-col gap-2">
            <li className="flex items-center gap-2">
              <SettingsIcon /> Settings
            </li>
            <li className="flex items-center gap-2" onClick={signOutUser}>
              <Button
                sx={{ fontWeight: 600 }}
                variant="outlined"
                onClick={signOutUser}
                startIcon={<LogoutIcon />}
              >
                Log out
              </Button>
            </li>
          </ul>
        </AccordionDetails>
      </Accordion>
    </header>
  );
};

export default Header;
