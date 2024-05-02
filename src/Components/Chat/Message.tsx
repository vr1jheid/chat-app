import UserAvatar from "../Shared/UserAvatar";
import Loader from "../Shared/Loader";
import getTimeFromTimestamp from "../../utils/getTimeFromTimestamp";
import { MessageAuthor, Timestamp } from "../../Types/messageTypes";
import clsx from "clsx";

interface Props {
  isMyself: boolean;
  author: MessageAuthor | null;
  text: string;
  timestamp: Timestamp | null;
  deleteMessage: () => Promise<void>;
}

const Message = ({
  author,
  text,
  timestamp,
  deleteMessage,
  isMyself,
}: Props) => {
  const time = timestamp && getTimeFromTimestamp(timestamp.seconds);

  return (
    <div
      className={clsx("flex max-w-full justify-start", {
        "justify-end": isMyself,
      })}
    >
      <div className="flex items-end w-fit max-w-[40%] gap-2">
        {author && (
          <UserAvatar
            alt={author.displayName ?? author.email}
            src={author.avatarURL}
          />
        )}

        <div
          className={clsx(
            "rounded-2xl text-white flex flex-col gap-3 max-w-full bg-gray-light p-2 px-4 relative",
            {
              "bg-purple-main": isMyself,
            }
          )}
        >
          {!timestamp && <Loader />}
          {author && (
            <div className=" text-purple-main">{author.displayName}</div>
          )}

          <div className="flex max-w-full gap-3 justify-between">
            <div className="text-xl break-words w-[80%] grow">{text}</div>
            <div
              className={clsx("text-gray-extra-light self-end", {
                "text-purple-extra-light": isMyself,
              })}
              onClick={deleteMessage}
            >
              {time}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
