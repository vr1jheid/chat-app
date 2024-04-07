import { Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import { ref, set } from "firebase/database";
import { realTimeDB } from "../firebase-config";

const Chat = () => {
  const [message, setMessage] = useState("");
  const sendMessage = async () => {
    set(ref(realTimeDB, "mainChat"), {
      message,
    });
  };
  return (
    <div className="h-[700px] w-9/12 bg-slate-100 mx-auto my-10 rounded flex items-center flex-col ">
      <div className=" grow w-full ">
        
      </div>
      <div className=" w-full flex gap-2">
        <TextField
          sx={{ background: "white" }}
          multiline
          fullWidth
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        ></TextField>
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={sendMessage}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default Chat;
