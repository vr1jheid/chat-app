import clsx from "clsx";
import { useRef, useContext, useEffect } from "react";
import { setSize } from "../../../Store/MessagesSizes/messagesSizes";
import { useAppDispatch, useAppSelector } from "../../../Store/hooks";
import { MessageAuthor, MessageTime } from "../../../Types/messageTypes";
import getTimeFromTimestamp from "../../../utils/getTimeFromTimestamp";
import Loader from "../../Shared/Loader";
import UserAvatar from "../../Shared/UserAvatar";
import { ChatContext } from "../ChatContextContainer";
import { selectWindowSize } from "../../../Store/WindowSize/windowSize";

interface Props {
  id: string;
  isMyself: boolean;
  author: MessageAuthor | null;
  text: string;
  timestamp: MessageTime | null;
  deleteMessage: () => Promise<void>;
  index: number;
}

const Message = ({
  id,
  author,
  text,
  timestamp,
  deleteMessage,
  isMyself,
  index,
}: Props) => {
  const messageRoot = useRef<HTMLDivElement | null>(null);
  const { listRef } = useContext(ChatContext);
  const dispatch = useAppDispatch();
  const screenSize = useAppSelector(selectWindowSize);

  useEffect(() => {
    const size = messageRoot.current?.getBoundingClientRect().height;
    if (!size) return;
    dispatch(setSize({ id, size }));
    listRef?.current?.resetAfterIndex(index);
  }, [screenSize]);

  const time = timestamp?.seconds && getTimeFromTimestamp(timestamp.seconds);
  return (
    <div
      ref={messageRoot}
      className={clsx("flex grow max-w-full rotate-180", {
        "justify-end": isMyself,
        "justify-start": !isMyself,
      })}
      style={{ direction: "ltr" }}
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
            <div className="text-purple-main text-left">
              {author.displayName}
            </div>
          )}

          <div className="flex flex-row-reverse  max-w-full gap-3 justify-between">
            <div className="text-xl break-words w-[80%] grow text-left">
              {text}
              <span
                className={clsx(
                  " inline-block ml-3 text-gray-extra-light text-s float-right ",
                  {
                    "text-purple-extra-light": isMyself,
                  }
                )}
              >
                {time || "??:??"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
