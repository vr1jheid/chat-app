import { selectChatsSlice } from "../../Store/Chats/chats";
import { selectChatFromObserved } from "../../Store/Chats/thunks/selectChatFromObserved";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { ChatData } from "../../Types/chatTypes";
import { Loader } from "../Shared/Loader";
import { ChatPreview } from "./ChatPreview";

export const ChatsList = () => {
  const dispatch = useAppDispatch();
  const { chats, isLoading } = useAppSelector(selectChatsSlice);

  const sortedChats = Object.values(chats)
    .filter((c) => c.lastMessage)
    .sort(
      (a, b) =>
        (b.lastMessage?.serverTime ?? 0) - (a.lastMessage?.serverTime ?? 0)
    );

  const selectAsActive = (chat: ChatData) => {
    dispatch(selectChatFromObserved(chat.id));
  };

  return (
    <section className="flex flex-col gap-2 overflow-auto">
      {!sortedChats.length && isLoading && <Loader color="#766ac8" />}
      {sortedChats.length &&
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
