import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { selectAllChats } from "../../Store/Chats/chats";
import ChatPreview from "./ChatPreview";
import { ChatData } from "../../Types/chatTypes";
import { selectChatFromObserved } from "../../Store/Chats/thunks/selectChatFromObserved";

const ChatsList = () => {
  const dispatch = useAppDispatch();
  const chatsList = useAppSelector(selectAllChats);

  const sortedChats = Object.values(chatsList)
    .filter((c) => c.lastMessage)
    .sort(
      (a, b) =>
        b.lastMessage?.serverTime?.seconds! -
        a.lastMessage?.serverTime?.seconds!
    );

  const selectAsActive = (chat: ChatData) => {
    dispatch(selectChatFromObserved(chat.id));
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
