import clsx from "clsx";
import { useCallback, useContext, useEffect, useRef } from "react";
import { ListChildComponentProps } from "react-window";

import { deleteMessage } from "../../../Services/deleteMessage";
import { selectCurrentUserEmail } from "../../../Store/CurrentUser/currentUser";
import { useAppDispatch, useAppSelector } from "../../../Store/hooks";
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
  const { listRef, messagesSizes } = useContext(ChatContext);
  const screenSize = useAppSelector(selectWindowSize);
  const currentUserEmail = useAppSelector(selectCurrentUserEmail);

  const chatData = data;
  const message = chatData.messages[index];
  const isMyself = currentUserEmail === message?.author.email;

  useEffect(() => {
    const size = messageRoot.current?.getBoundingClientRect().height;
    if (!size || !messagesSizes?.current) return;
    messagesSizes.current[message.id] = size;
    listRef?.current?.resetAfterIndex(index);
  }, [screenSize, message?.serverTime]);

  const renderDate = () => {
    const prevMessage = chatData.messages[index + 1];
    if (!message.serverTime) return;

    if (
      index === chatData.messages.length - 1 ||
      (prevMessage.serverTime &&
        !isSameDate(message.serverTime, prevMessage.serverTime))
    ) {
      return (
        <div className="text-white p-2 py-3 text-center rounded-full m-auto">
          {getDateFromTimestamp(message.serverTime ?? Date.now())}
        </div>
      );
    }
  };

  const isItemLoaded = (index: number) => index < chatData.messages.length;
  const onAuthorClick = useCallback(() => {
    dispatch(setModal({ type: "userInfo", data: message.author }));
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
              author={message.author}
              isMyself={isMyself}
              showAuthor={!isMyself && chatData.type !== ChatTypes.dialog}
              text={message.messageText}
              timestamp={message.serverTime}
              onAuthorClick={onAuthorClick}
              deleteMessageFunc={() => {
                return;
                deleteMessage(chatData.id, message.id);
              }}
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
