import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { changeLastMessage, selectAllChats } from "../../Store/Chats/chats";
import ChatPreview from "./ChatPreview";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase-config";
import { ChatDataDB } from "../../Types/chatTypes";
import { setActive } from "../../Store/ActiveChat/activeChat";

const ChatsList = () => {
  const dispatch = useAppDispatch();
  const chatsList = useAppSelector(selectAllChats);

  const subOnLastMessageChange = () => {
    const chatsIds = Object.keys(chatsList);
    if (!chatsIds.length) return;

    const chatsQuery = query(
      collection(db, "chats"),
      where("id", "in", Object.keys(chatsList))
    );
    console.log("subscribed");

    const unsubscribe = onSnapshot(chatsQuery, (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        const changedDoc = change.doc.data() as ChatDataDB;

        if (querySnapshot.metadata.hasPendingWrites) return;

        if (change.type === "modified" && changedDoc.lastMessage) {
          dispatch(changeLastMessage({ ...changedDoc }));
        }
      });
    });
    return unsubscribe;
  };

  useEffect(() => {
    const sub = subOnLastMessageChange();
    return sub;
  }, [chatsList]);

  const sortedChats = useMemo(
    () =>
      Object.values(chatsList)
        .filter((c) => c.lastMessage)
        .sort(
          (a, b) =>
            b.lastMessage?.serverTime?.seconds! -
            a.lastMessage?.serverTime?.seconds!
        ),
    [chatsList]
  );

  return (
    <section className="flex flex-col gap-2">
      {sortedChats &&
        sortedChats.map((chat) => (
          <ChatPreview
            key={chat.id}
            chatData={chat}
            clickAction={() => {
              dispatch(setActive(chat));
            }}
          />
        ))}
    </section>
  );
};

export default ChatsList;
