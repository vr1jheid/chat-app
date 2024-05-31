import { IconButton, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import { selectActiveChat } from "../../Store/ActiveChat/activeChat";
import { selectCurrentUser } from "../../Store/CurrentUser/currentUser";
import { useAppSelector } from "../../Store/hooks";
import sendMessageToDB from "../../Services/sendMessageToDB";

const SendMessageForm = () => {
  const [message, setMessage] = useState("");
  const { id: activeChatID } = useAppSelector(selectActiveChat);
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
    <form className="w-[65%] flex gap-2 mt-6">
      <TextField
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
        <div className=" bg-gray-light h-12 w-12 rounded-full flex items-center justify-center">
          <SendIcon sx={{ color: "white" }} />
        </div>
      </IconButton>
    </form>
  );
};

export default SendMessageForm;
