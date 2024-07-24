import { selectChatsSlice } from "../../Store/Chats/chats";
import { selectChatFromObserved } from "../../Store/Chats/thunks/selectChatFromObserved";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
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

  return (
    <ul className="flex flex-col gap-2 overflow-auto">
      {!sortedChats.length && isLoading && <Loader color="#766ac8" />}
      {sortedChats.map((chat) => {
        return (
          <li
            id={chat.id}
            key={chat.id}
            tabIndex={1}
            className="block outline-none focus-visible:border-purple-main focus-visible:border-2 focus-visible:border-solid focus-visible:rounded-lg "
            onFocus={(e) => {
              if (e.target !== e.currentTarget) return;

              e.currentTarget.onkeydown = (e: KeyboardEvent) => {
                if (e.key === "Enter") {
                  dispatch(selectChatFromObserved(chat.id));
                }
              };
            }}
            onBlur={(e) => {
              e.currentTarget.onkeydown = null;
            }}
            onClick={() => {
              dispatch(selectChatFromObserved(chat.id));
            }}
          >
            <ChatPreview chatData={chat} />
          </li>
        );
      })}
    </ul>
  );
};
