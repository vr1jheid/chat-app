import { Button, Menu, MenuItem } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import UserAvatar from "../Shared/UserAvatar";
import { useAppSelector } from "../../Store/hooks";
import { selectCurrentUser } from "../../Store/CurrentUser/currentUser";
import { signOut } from "firebase/auth";
import { auth } from "../../main";

const UserMenu = () => {
  const contRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState<number | null>(null);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);
  const { displayName, email, avatarURL } = useAppSelector(selectCurrentUser);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (contRef.current) {
      setWidth(contRef.current.clientWidth);
    }
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  const userName = displayName ?? email;

  return (
    <div className="flex items-center content-center" ref={contRef}>
      <Button
        size="large"
        sx={{
          color: "white",
        }}
        variant="text"
        onClick={handleClick}
      >
        <div className="flex gap-5 items-center">
          <div>{userName}</div>
          <UserAvatar alt={userName} src={avatarURL} size={30} />
        </div>
      </Button>
      <Menu
        sx={{
          "& .MuiList-root": {
            minWidth: `${width}px`,
          },
        }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
