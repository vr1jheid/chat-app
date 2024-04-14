import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/slices/currentUser";
import { MessageAuthor, Timestamp } from "./Chat";
import renderAvatar from "../../utils/renderAvatar";
import { Paper } from "@mui/material";
import Loader from "../Loader";
import getTimeFromTimestamp from "../../utils/getTimeFromTimestamp";

interface Props {
  author: MessageAuthor;
  text: string;
  timestamp: Timestamp;
  deleteMessage: () => Promise<void>;
}

const Message = ({ author, text, timestamp, deleteMessage }: Props) => {
  const { email: currentUserEmail } = useAppSelector(selectCurrentUser);
  const isMyself = currentUserEmail === author.email;
  const time = timestamp && getTimeFromTimestamp(timestamp.seconds);

  return (
    <div className={`flex ${isMyself ? "justify-end" : "justify-start"} `}>
      <div className="flex items-end w-fit max-w-[40%] gap-2 ">
        {!isMyself &&
          renderAvatar(author.displayName ?? author.email, author.avatarURL)}
        <Paper elevation={3}>
          <div className="rounded flex flex-col  gap-3 bg-slate-600 p-2 relative">
            {!timestamp && <Loader />}
            <div className=" text-green-500 inline-flex gap-3">
              <span onClick={deleteMessage}>
                {author.displayName ?? author.email}
              </span>
              <span>{time ?? ""}</span>
            </div>
            <div className="flex items-end text-white text-xl">{text}</div>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default Message;
