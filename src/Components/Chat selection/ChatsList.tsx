import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { changeLastMessage, selectAllChats } from "../../redux/slices/chats";
import ChatPreview from "./ChatPreview";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase-config";
import { ChatDataDB } from "../../Types/chatTypes";

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

        if (change.type === "modified") {
          dispatch(changeLastMessage(changedDoc));
        }
      });
    });
    return unsubscribe;
  };

  useEffect(() => {
    const sub = subOnLastMessageChange();

    return sub;
  }, [chatsList]);

  return (
    <section className="flex flex-col gap-2">
      {chatsList &&
        Object.values(chatsList)
          .filter((c) => c.lastMessage)
          .map((chat) => <ChatPreview key={chat.id} chatData={chat} />)}
    </section>
  );
};

export default ChatsList;
