import { Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { serverTimestamp } from "firebase/firestore";
import { DocumentData, DocumentReference, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAppSelector } from "../redux/hooks";
import {
  selectUserEmail,
  selectUserName,
  selectAvatarURL,
} from "../redux/slices/currentUser";

interface Props {
  firebaseRef: DocumentReference<DocumentData, DocumentData>;
}

const MessageInput = ({ firebaseRef }: Props) => {
  const [message, setMessage] = useState("");

  const userEmail = useAppSelector(selectUserEmail);
  const userName = useAppSelector(selectUserName);
  const userAvatar = useAppSelector(selectAvatarURL);

  const sendMessage = async () => {
    if (!message) return;

    const messageId = uuidv4();
    const messageWithInfo = {
      [messageId]: {
        id: messageId,
        message,
        author: {
          email: userEmail,
          displayName: userName,
          avatarURL: userAvatar,
        },
        serverTime: serverTimestamp(),
      },
    };

    try {
      await updateDoc(firebaseRef, {
        ...messageWithInfo,
      });
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className=" w-full flex gap-2">
      <TextField
        onKeyDown={(e) => {
          if (e.key !== "Enter") return;
          e.preventDefault();
          sendMessage();
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
        onClick={sendMessage}
      >
        Send
      </Button>
    </form>
  );
};

export default MessageInput;
