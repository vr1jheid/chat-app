import { useAppSelector } from "../redux/hooks";
import { selectCurrentUser } from "../redux/slices/currentUser";
import { MessageAuthor, Timestamp } from "./Chat/Chat";
import renderAvatar from "../utils/renderAvatar";
import { DocumentReference, DocumentData } from "firebase/firestore";
import { CircularProgress } from "@mui/material";

interface Props {
  author: MessageAuthor;
  text: string;
  timestamp: Timestamp;
  deleteMessage: () => Promise<void>;
}

const Message = ({ author, text, timestamp, deleteMessage }: Props) => {
  const { email: currentUserEmail } = useAppSelector(selectCurrentUser);
  const isMyself = currentUserEmail === author.email;
  const date = timestamp && new Date(timestamp.seconds * 1000);
  const time =
    date &&
    `${date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:${
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
    }`;

  return (
    <div className={`flex ${isMyself ? "justify-end" : "justify-start"} `}>
      <div className="flex items-end w-fit max-w-[40%] gap-2 ">
        {!isMyself &&
          renderAvatar(author.displayName ?? author.email, author.avatarURL)}
        <div className="rounded flex flex-col  gap-3 bg-slate-600 p-2 relative">
          {!timestamp && (
            <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center text-white">
              <CircularProgress color="inherit" />
            </div>
          )}
          <div className=" text-green-500 inline-flex gap-3">
            <span onClick={deleteMessage}>
              {author.displayName ?? author.email}
            </span>
            <span>{time ?? ""}</span>
          </div>
          <div className="flex items-end text-white text-xl">{text}</div>
        </div>
      </div>
    </div>
  );
};

export default Message;
