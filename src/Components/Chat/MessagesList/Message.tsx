import clsx from "clsx";
import { useRef, useContext, useEffect } from "react";
import { setSize } from "../../../Store/MessagesSizes/messagesSizes";
import { useAppDispatch } from "../../../Store/hooks";
import { MessageAuthor, MessageTime } from "../../../Types/messageTypes";
import getTimeFromTimestamp from "../../../utils/getTimeFromTimestamp";
import Loader from "../../Shared/Loader";
import UserAvatar from "../../Shared/UserAvatar";
import { ChatContext } from "../ChatContextContainer";

interface Props {
  isMyself: boolean;
  author: MessageAuthor | null;
  text: string;
  timestamp: MessageTime | null;
  deleteMessage: () => Promise<void>;
  index: number;
}

const Message = ({
  author,
  text,
  timestamp,
  deleteMessage,
  isMyself,
  index,
}: Props) => {
  const dispatch = useAppDispatch();
  const time = timestamp?.seconds && getTimeFromTimestamp(timestamp.seconds);
  const messageRoot = useRef<HTMLDivElement | null>(null);
  const { listRef } = useContext(ChatContext);

  useEffect(() => {
    console.log(messageRoot.current);
    console.log(text);

    const size = messageRoot.current?.getBoundingClientRect().height;

    if (!size) return;
    dispatch(setSize({ index, size }));
    listRef?.current?.resetAfterIndex(index);
    console.log(size, index);
  }, []);

  return (
    <div
      ref={messageRoot}
      className={clsx("flex grow h-fit max-w-full   rotate-180", {
        "justify-end": !isMyself,
        "justify-start": isMyself,
      })}
    >
      <div className="flex flex-row-reverse items-end w-fit max-w-[40%] gap-2">
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

          <div className="flex flex-row-reverse max-w-full gap-3 justify-between">
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
