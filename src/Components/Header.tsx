import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { selectCurrentUser } from "../redux/slices/currentUser";
import renderAvatar from "../utils/renderAvatar";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { useAppSelector } from "../redux/hooks";

const Header = () => {
  const currentUser = useAppSelector(selectCurrentUser);

  const signOutUser = async () => {
    await signOut(auth);
    console.log("user signed out");
  };

  return (
    <header className="p-4 px-10 h-22 w-full fixed z-50 [&_svg]:text-white bg-[#212121] text-white flex justify-between">
      {
        <h1 className="text-5xl h-[50px] font-medium inline-flex items-center">
          React Chat
        </h1>
      }
      <Accordion
        sx={{
          position: "absolute",
          right: "40px",
          backgroundColor: "#2c2c2c",
          color: "white",
        }}
      >
        <AccordionSummary
          sx={{
            height: "50px",
            display: "flex",
            gap: "10px",
          }}
          expandIcon={<ArrowDropDownIcon />}
        >
          <div className="flex items-center gap-3">
            {currentUser.displayName ?? currentUser.email}{" "}
            {renderAvatar(
              currentUser.displayName ?? currentUser.email,
              currentUser.avatarURL,
              30
            )}
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
