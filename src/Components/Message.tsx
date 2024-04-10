import { Avatar } from "@mui/material";
import { useAppSelector } from "../redux/hooks";
import { selectUserEmail } from "../redux/slices/currentUser";
import { MessageAuthor, Timestamp } from "./Chat";
import renderAvatar from "../utils/renderAvatar";

interface Props {
  author: MessageAuthor;
  text: string;
  timestamp: Timestamp;
}

const Message = ({ author, text, timestamp }: Props) => {
  const currentUserEmail = useAppSelector(selectUserEmail);
  const isMyself = currentUserEmail === author.email;
  const date = new Date(timestamp.seconds * 1000);
  const time = `${
    date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
  }:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}`;

  const renderAvatarInMessage = () => {
    if (isMyself) return;
    return renderAvatar(author);
  };

  return (
    <div className={`flex ${isMyself ? "justify-end" : "justify-start"}`}>
      <div className="flex items-end w-fit max-w-[40%] gap-2 ">
        {renderAvatarInMessage()}
        <div className="rounded flex flex-col  gap-3 bg-slate-600 p-2 ">
          <div className=" text-green-500 inline-flex gap-3">
            <span>{author.displayName ?? author.email}</span>
            <span>{time}</span>
          </div>
          <div className="flex items-end text-white text-xl">{text}</div>
        </div>
      </div>
    </div>
  );
};

export default Message;
