import { query, collection, where, onSnapshot } from "firebase/firestore";
import { ChatsState, LastMessageWithChatID } from "../../../Store/Chats/chats";
import { ChatDataDB } from "../../../Types/chatTypes";
import { db } from "../../../firebase-config";
import { convertServerTime } from "../../../utils/convertServerTime";

export const subOnLastMessageChange = (
  chatsList: ChatsState,
  action: (message: LastMessageWithChatID) => void
) => {
  const chatsIds = Object.keys(chatsList);
  if (!chatsIds.length) return;

  const chatsQuery = query(
    collection(db, "chats"),
    where("id", "in", Object.keys(chatsList))
  );

  const unsubscribe = onSnapshot(chatsQuery, (querySnapshot) => {
    querySnapshot.docChanges().forEach((change) => {
      const changedDoc = change.doc.data() as ChatDataDB;

      if (querySnapshot.metadata.hasPendingWrites) return;

      if (change.type === "modified" && changedDoc.lastMessage) {
        action({
          chatID: changedDoc.id,
          message: {
            ...changedDoc.lastMessage,
            serverTime: convertServerTime(changedDoc.lastMessage.serverTime),
          },
        });
      }
    });
  });
  return unsubscribe;
};
