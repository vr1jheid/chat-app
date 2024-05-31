import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import {
  changeLastMessage,
  selectAllChats,
  selectChatsNum,
} from "../../Store/Chats/chats";
import ChatPreview from "./ChatPreview";
import { subOnLastMessageChange } from "./utils/subOnLastMessageChange";
import { setActive } from "../../Store/ActiveChat/activeChat";

const ChatsList = () => {
  const dispatch = useAppDispatch();
  const chatsList = useAppSelector(selectAllChats);
  const chatsNum = useAppSelector(selectChatsNum);

  useEffect(() => {
    const sub = subOnLastMessageChange(chatsList, (message) => {
      dispatch(changeLastMessage(message));
    });
    return sub;
  }, [chatsNum]);

  const sortedChats = Object.values(chatsList)
    .filter((c) => c.lastMessage)
    .sort(
      (a, b) =>
        b.lastMessage?.serverTime?.seconds! -
        a.lastMessage?.serverTime?.seconds!
    );

  return (
    <section className="flex flex-col gap-2 overflow-auto">
      {sortedChats &&
        sortedChats.map((chat) => {
          return (
            <ChatPreview
              key={chat.id}
              chatData={chat}
              clickAction={() => {
                dispatch(setActive(chat));
              }}
            />
          );
        })}
    </section>
  );
};

export default ChatsList;
