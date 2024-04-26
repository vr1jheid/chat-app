import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  AppBar,
  Container,
  Toolbar,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { selectCurrentUser } from "../../redux/slices/currentUser";
import renderAvatar from "../../utils/renderAvatar";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useAppSelector } from "../../redux/hooks";
import ChatIcon from "@mui/icons-material/Chat";
import Menu from "./UserMenu";

const Header = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const userName = currentUser.displayName ?? currentUser.email;

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

      <Menu />
    </header>
  );
};

export default Header;
