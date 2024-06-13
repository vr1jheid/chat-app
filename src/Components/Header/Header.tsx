import { Typography } from "@mui/material";
import UserMenu from "./UserMenu";

const Header = () => {
  return (
    <header className="p-4 px-10 h-22 w-full h-[62px] fixed z-50 [&_svg]:text-white bg-gray-dark  text-white flex justify-between">
      {
        <Typography variant="h6" textAlign="center">
          Fire Chat
        </Typography>
      }
      <UserMenu />
    </header>
  );
};

export default Header;
