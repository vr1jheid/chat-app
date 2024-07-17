import { selectAllChats } from "../../Store/Chats/chats";
import { selectChatFromObserved } from "../../Store/Chats/thunks/selectChatFromObserved";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { ChatData } from "../../Types/chatTypes";
import { ChatPreview } from "./ChatPreview";

export const ChatsList = () => {
  const dispatch = useAppDispatch();
  const chatsList = useAppSelector(selectAllChats);

  const sortedChats = Object.values(chatsList)
    .filter((c) => c.lastMessage)
    .sort((a, b) => b.lastMessage?.serverTime! - a.lastMessage?.serverTime!);

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
