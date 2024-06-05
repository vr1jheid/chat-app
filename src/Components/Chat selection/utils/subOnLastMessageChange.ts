import { query, collection, where, onSnapshot } from "firebase/firestore";
import { changeLastMessage } from "../../../Store/Chats/chats";
import { ChatDataDB } from "../../../Types/chatTypes";
import { convertServerTime } from "../../../utils/convertServerTime";
import { db } from "../../../main";
import store from "../../../Store/store";

export const subOnLastMessageChange = (chatsIDs: string[]) => {
  const dispatch = store.dispatch;
  if (!chatsIDs.length) return;

  const chatsQuery = query(
    collection(db, "chats"),
    where("id", "in", chatsIDs)
  );

  const unsubscribe = onSnapshot(chatsQuery, (querySnapshot) => {
    querySnapshot.docChanges().forEach((change) => {
      const changedDoc = change.doc.data() as ChatDataDB;

      if (querySnapshot.metadata.hasPendingWrites) return;

      if (change.type === "modified" && changedDoc.lastMessage) {
        dispatch(
          changeLastMessage({
            chatID: changedDoc.id,
            message: {
              ...changedDoc.lastMessage,
              serverTime: convertServerTime(changedDoc.lastMessage.serverTime),
            },
          })
        );
      }
    });
  });
  return unsubscribe;
};
