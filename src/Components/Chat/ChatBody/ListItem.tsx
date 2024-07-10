import { selectCurrentUserEmail } from "../../../Store/CurrentUser/currentUser";
import { useAppSelector } from "../../../Store/hooks";
import { Message } from "./Message";
import { Loader } from "../../Shared/Loader";
import getDateFromTimestamp from "../../../utils/getDateFromTimestamp";
import { isNextDay } from "../../../utils/isNextDay";
import { MessageData } from "../../../Types/messageTypes";
import { ListChildComponentProps } from "react-window";
import { ChatTypes } from "../../../Types/chatTypes";

interface Props {
  messages: MessageData[];
  type: ChatTypes;
  id: string;
}

export const ListItem = ({
  index,
  style,
  data,
}: ListChildComponentProps<Props>) => {
  const { messages, type } = data;
  const currentUserEmail = useAppSelector(selectCurrentUserEmail);
  const message = messages[index];
  const isMyself = currentUserEmail === message?.author.email;

  const isItemLoaded = (index: number) => index < messages.length;

  const renderDate = () => {
    if (
      isNextDay(message, messages[index + 1]) ||
      index === messages.length - 1
    ) {
      return (
        <div className="text-white p-2 py-3 text-center rounded-full m-auto">
          {getDateFromTimestamp(message.serverTime ?? Date.now())}
        </div>
      );
    }
  };

  return (
    <div className="rotate-180" style={style}>
      {isItemLoaded(index) ? (
        <>
          {renderDate()}
          <Message
            id={message.id}
            index={index}
            isMyself={isMyself}
            author={message.author}
            text={message.messageText}
            timestamp={message.serverTime}
            chatType={type}
            deleteMessageFunc={() => {
              /* deleteMessage(id, message.id); */
            }}
          />
        </>
      ) : (
        <div>
          <Loader color="white" />
        </div>
      )}
    </div>
  );
};
