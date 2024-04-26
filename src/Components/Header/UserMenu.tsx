import { Button, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import renderAvatar from "../../utils/renderAvatar";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/slices/currentUser";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);
  const { displayName, email, avatarURL } = useAppSelector(selectCurrentUser);
  const userName = displayName ?? email;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = async () => {
    await signOut(auth);
    console.log("user signed out");
  };

  return (
    <div className="flex items-center content-center">
      <Button onClick={handleClick}>
        <div className="flex gap-5 items-center">
          <div>{userName}</div>
          {renderAvatar(userName, avatarURL, 30)}
        </div>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={logOut}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
