import { Button, Menu, MenuItem } from "@mui/material";
import React, { memo, useRef, useState } from "react";

import { logout } from "../../Services/logout";
import { selectUserData } from "../../Store/CurrentUser/currentUser";
import { useAppSelector } from "../../Store/hooks";
import { UserAvatar } from "../Shared/UserAvatar";

const UserMenu = memo(() => {
  const contRef = useRef<HTMLDivElement | null>(null);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);
  const { displayName, email, avatarURL } = useAppSelector(selectUserData);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const userName = displayName ?? email;

  return (
    <div className="flex items-center content-center" ref={contRef}>
      <Button
        color="primary"
        size="large"
        variant="text"
        onClick={handleClick}
        sx={{ padding: 0 }}
      >
        <div className="flex gap-5 items-center text-white p-2 hover:bg-gray-hover rounded">
          <UserAvatar alt={userName} src={avatarURL} size={40} />
        </div>
      </Button>
      <Menu
        id="basic-menu"
        className="py-0"
        sx={{ "& .MuiList-root": { padding: 0 } }}
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem className="h-12" onClick={logout}>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
});

export default UserMenu;
