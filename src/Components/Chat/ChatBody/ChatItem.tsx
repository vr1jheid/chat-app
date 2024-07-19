import clsx from "clsx";
import { useCallback, useContext, useEffect, useRef } from "react";
import { ListChildComponentProps } from "react-window";

import { selectCurrentUserEmail } from "../../../Store/CurrentUser/currentUser";
import { useAppDispatch, useAppSelector } from "../../../Store/hooks";
import { setSize } from "../../../Store/MessagesSizes/messagesSizes";
import { setModal } from "../../../Store/Modal/modalSlice";
import { selectWindowSize } from "../../../Store/WindowSize/windowSize";
import { ChatTypes } from "../../../Types/chatTypes";
import { MessageData } from "../../../Types/messageTypes";
import getDateFromTimestamp from "../../../utils/getDateFromTimestamp";
import { isSameDate } from "../../../utils/isSameDate";
import { Loader } from "../../Shared/Loader";
import { ChatContext } from "../Context/ChatContext";
import { Message } from "./Message";

interface Props {
  messages: MessageData[];
  type: ChatTypes;
  id: string;
}

export const ChatItem = ({
  index,
  style,
  data,
}: ListChildComponentProps<Props>) => {
  const dispatch = useAppDispatch();
  const messageRoot = useRef<HTMLDivElement | null>(null);
  const { listRef } = useContext(ChatContext);
  const screenSize = useAppSelector(selectWindowSize);

  const { messages } = data;
  const currentUserEmail = useAppSelector(selectCurrentUserEmail);
  const message = messages[index];
  const isMyself = currentUserEmail === message?.author.email;

  useEffect(() => {
    const size = messageRoot.current?.getBoundingClientRect().height;
    if (!size) return;
    dispatch(setSize({ id: message.id, size }));
    listRef?.current?.resetAfterIndex(index);
  }, [screenSize]);

  const renderDate = () => {
    const prevMessage = messages[index + 1];
    if (!message.serverTime || !prevMessage?.serverTime) return;
    if (
      !isSameDate(message.serverTime, prevMessage.serverTime) ||
      index === messages.length - 1
    ) {
      return (
        <div className="text-white p-2 py-3 text-center rounded-full m-auto">
          {getDateFromTimestamp(message.serverTime ?? Date.now())}
        </div>
      );
    }
  };

  const isItemLoaded = (index: number) => index < messages.length;
  const author = !isMyself
    ? {
        name: message.author.displayName,
        avatarURL: message.author.avatarURL,
      }
    : null;
  const onAuthorClick = useCallback(() => {
    dispatch(setModal({ type: "userInfo", data: author }));
  }, []);
  return (
    <div className="rotate-180" style={style}>
      {isItemLoaded(index) ? (
        <>
          {renderDate()}
          <div
            id={message.id}
            ref={messageRoot}
            className={clsx("flex grow max-w-full", {
              "justify-end": isMyself,
              "justify-start": !isMyself,
            })}
            style={{ direction: "ltr" }}
          >
            <Message
              id={message.id}
              author={author}
              text={message.messageText}
              timestamp={message.serverTime}
              onAuthorClick={onAuthorClick}
            />
          </div>
        </>
      ) : (
        <div>
          <Loader color="white" />
        </div>
      )}
    </div>
  );
};