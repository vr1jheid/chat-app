import { selectCurrentUserEmail } from "../../../Store/CurrentUser/currentUser";
import { useAppSelector } from "../../../Store/hooks";
import Message from "./Message";
import Loader from "../../Shared/Loader";
import getDateFromTimestamp from "../../../utils/getDateFromTimestamp";
import { isNextDay } from "../../../utils/isNextDay";
import { MessageData } from "../../../Types/messageTypes";
import { ListChildComponentProps } from "react-window";

export const ListItem = ({
  index,
  style,
  data: messages,
}: ListChildComponentProps<MessageData[]>) => {
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
          {getDateFromTimestamp(message.serverTime?.seconds!)}
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
