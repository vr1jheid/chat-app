import clsx from "clsx";
import { useRef, useContext, useEffect } from "react";
import { setSize } from "../../../Store/MessagesSizes/messagesSizes";
import { useAppDispatch, useAppSelector } from "../../../Store/hooks";
import { MessageAuthor } from "../../../Types/messageTypes";
import getTimeFromTimestamp from "../../../utils/getTimeFromTimestamp";
import { Loader } from "../../Shared/Loader";
import { UserAvatar } from "../../Shared/UserAvatar";
import { selectWindowSize } from "../../../Store/WindowSize/windowSize";
import { ChatTypes } from "../../../Types/chatTypes";
import { setModal } from "../../../Store/Modal/modalSlice";
import { ChatContext } from "../Context/ChatContext";

interface Props {
  id: string;
  isMyself: boolean;
  author: MessageAuthor;
  text: string;
  timestamp: number | null;
  index: number;
  chatType: ChatTypes;
  deleteMessageFunc: () => void;
}

export const Message = ({
  id,
  author,
  text,
  timestamp,
  isMyself,
  index,
  chatType,
  deleteMessageFunc,
}: Props) => {
  const dispatch = useAppDispatch();
  const messageRoot = useRef<HTMLDivElement | null>(null);
  const { listRef } = useContext(ChatContext);
  const screenSize = useAppSelector(selectWindowSize);

  useEffect(() => {
    const size = messageRoot.current?.getBoundingClientRect().height;
    if (!size) return;
    dispatch(setSize({ id, size }));
    listRef?.current?.resetAfterIndex(index);
  }, [screenSize]);

  const time = timestamp
    ? getTimeFromTimestamp(timestamp)
    : getTimeFromTimestamp(Date.now());

  const isGroup = chatType === ChatTypes.group;

  return (
    <div
      id={id}
      ref={messageRoot}
      className={clsx("flex grow max-w-full", {
        "justify-end": isMyself,
        "justify-start": !isMyself,
      })}
      style={{ direction: "ltr" }}
    >
      <div
        className="flex items-end w-fit max-w-[80%] gap-2"
        onClick={deleteMessageFunc}
      >
        {!isMyself && isGroup && (
          <button
            className="cursor-pointer"
            onClick={() => {
              dispatch(setModal({ type: "userInfo", data: author }));
            }}
          >
            <UserAvatar
              alt={author.displayName ?? author.email}
              src={author.avatarURL}
            />
          </button>
        )}

        <div
          className={clsx(
            "rounded-2xl text-white flex flex-col gap-1 lg:gap-3 max-w-full bg-gray-light p-2 lg:px-4 relative",
            {
              "bg-purple-main": isMyself,
            }
          )}
        >
          {!timestamp && (
            <div className="absolute bottom-0 -left-2 h-10 w-10 -translate-x-full">
              <Loader />
            </div>
          )}
          {!isMyself && isGroup && (
            <div className="text-purple-main text-left">
              {author.displayName ?? author.email}
            </div>
          )}

          <div className="flex flex-row-reverse  max-w-full gap-3 justify-between">
            <div className=" text-base lg:text-xl break-words w-[80%] grow text-left">
              {text}
              <span
                className={clsx(
                  " inline-block ml-3 text-gray-extra-light lg:text-sm text-xs  float-right translate-y-1/2",
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
