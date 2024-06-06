import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { selectAllChats } from "../../Store/Chats/chats";
import ChatPreview from "./ChatPreview";
import {
  selectActiveChatID,
  setActive,
} from "../../Store/ActiveChat/activeChat";
import { ChatData } from "../../Types/chatTypes";
import { clearSizes } from "../../Store/MessagesSizes/messagesSizes";
import { setInitialMessages } from "../../Store/ActiveChat/thunks/setInitialMessages";

const ChatsList = () => {
  const dispatch = useAppDispatch();
  const chatsList = useAppSelector(selectAllChats);
  const activeChatID = useAppSelector(selectActiveChatID);

  const sortedChats = Object.values(chatsList)
    .filter((c) => c.lastMessage)
    .sort(
      (a, b) =>
        b.lastMessage?.serverTime?.seconds! -
        a.lastMessage?.serverTime?.seconds!
    );

  const selectAsActive = (chat: ChatData) => {
    if (activeChatID === chat.id) return;

    dispatch(setActive(chat));
    dispatch(setInitialMessages(chat));
    dispatch(clearSizes());
  };

  return (
    <section className="flex flex-col gap-2 overflow-auto">
      {sortedChats &&
        sortedChats.map((chat) => {
          return (
            <ChatPreview
              key={chat.id}
              chatData={chat}
              clickAction={() => {
                selectAsActive(chat);
              }}
            />
          );
        })}
    </section>
  );
};

export default ChatsList;
