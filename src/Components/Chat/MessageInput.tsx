import { Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";

interface Props {
  sendMessage: (messageText: string) => void;
  scroll: () => void;
}

const MessageInput = ({ sendMessage, scroll }: Props) => {
  const [message, setMessage] = useState("");

  const sendMessageToDB = () => {
    try {
      sendMessage(message);
      setMessage("");
      scroll();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className=" w-[65%] flex gap-2">
      <TextField
        onKeyDown={(e) => {
          if (e.key !== "Enter") return;
          e.preventDefault();
          sendMessageToDB();
        }}
        sx={{ background: "white" }}
        multiline
        fullWidth
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      ></TextField>
      <Button
        type="button"
        variant="contained"
        endIcon={<SendIcon />}
        onClick={sendMessageToDB}
      >
        Send
      </Button>
    </form>
  );
};

export default MessageInput;
