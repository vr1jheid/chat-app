import { TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import { selectActiveChatID } from "../../Store/ActiveChat/activeChat";
import { selectCurrentUser } from "../../Store/CurrentUser/currentUser";
import { useAppSelector } from "../../Store/hooks";
import sendMessageToDB from "../../Services/sendMessageToDB";
import { selectWindowSize } from "../../Store/WindowSize/windowSize";

const SendMessageForm = () => {
  const { width } = useAppSelector(selectWindowSize);
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

  const buttonSize = width < 1024 ? 25 : 30;

  return (
    <form className="flex w-full mt-1 pl-1 items-center lg:mt-6 lg:w-[65%] lg:gap-2 pb-2 ">
      <TextField
        className="h-fit "
        autoFocus={width >= 1024}
        size={width < 1024 ? "small" : "medium"}
        onKeyDown={(e) => {
          if (e.key !== "Enter") return;
          e.preventDefault();
          sendMessage();
        }}
        sx={{
          "& .MuiInputBase-input": {
            color: "white",
            fontSize: 20,
          },
          "& .MuiInputBase-root": {
            backgroundColor: "#212121",
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
      <button
        type="button"
        onClick={sendMessage}
        aria-label="send"
        className="flex items-center mx-1 bg-gray-light p-1 lg:p-2 h-fit w-fit text-gray-extra-light rounded-full  hover:text-white hover:bg-purple-main"
      >
        <SendIcon sx={{ width: buttonSize, height: buttonSize }} />
      </button>
    </form>
  );
};

export default SendMessageForm;
