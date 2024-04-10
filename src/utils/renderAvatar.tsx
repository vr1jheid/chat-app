import { Avatar } from "@mui/material";
import { MessageAuthor } from "../Components/Chat";
import { render } from "react-dom";

const renderAvatar = (user: MessageAuthor, size = 50) => {
  if (user.avatarURL) {
    return (
      <Avatar sx={{ width: size, height: size }} src={user.avatarURL}></Avatar>
    );
  }
  return (
    <Avatar sx={{ width: size, height: size }}>
      {user.email?.slice(0, 2)}
    </Avatar>
  );
};

export default renderAvatar;
