import { Button, Menu, MenuItem } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import renderAvatar from "../../utils/renderAvatar";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/slices/currentUser";
import { logOut } from "../../Services/logOut";

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
          {renderAvatar(userName, avatarURL, 30)}
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
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={logOut}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
