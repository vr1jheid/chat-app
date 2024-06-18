import { IconButton, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import { selectActiveChatID } from "../../Store/ActiveChat/activeChat";
import { selectCurrentUser } from "../../Store/CurrentUser/currentUser";
import { useAppSelector } from "../../Store/hooks";
import sendMessageToDB from "../../Services/sendMessageToDB";

const SendMessageForm = () => {
  const [message, setMessage] = useState("");
  const activeChatID = useAppSelector(selectActiveChatID);
  const currentUser = useAppSelector(selectCurrentUser);

  const sendMessage = () => {
    try {
      sendMessageToDB(message, activeChatID, currentUser);
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className=" flex w-full pl-2 mt-6 lg:w-[65%] lg:gap-2 lg:pl-0">
      <TextField
        autoFocus
        onKeyDown={(e) => {
          if (e.key !== "Enter") return;
          e.preventDefault();
          sendMessage();
        }}
        sx={{
          background: "#212121",
          borderRadius: "0.25rem",
          "& .MuiInputBase-input": {
            color: "white",
            fontSize: 20,
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        }}
        multiline
        fullWidth
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      ></TextField>
      <IconButton onClick={sendMessage} aria-label="send">
        <div className=" bg-gray-light p-2 h-fit w-fit text-gray-extra-light rounded-full  hover:text-white hover:bg-purple-main">
          <SendIcon sx={{ width: 30, height: 30 }} />
        </div>
      </IconButton>
    </form>
  );
};

export default SendMessageForm;
