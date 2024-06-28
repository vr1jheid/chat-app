import { query, collection, where, onSnapshot } from "firebase/firestore";
import { changeLastMessage } from "../Store/Chats/chats";
import { ChatDataDB } from "../Types/chatTypes";
import { convertServerTime } from "../utils/convertServerTime";
import { db } from "../main";
import store from "../Store/store";
import { enqueueSnackbar } from "notistack";

export const subOnLastMessageChange = (chatsIDs: string[]) => {
  const dispatch = store.dispatch;
  if (!chatsIDs.length) return;

  const chatsQuery = query(
    collection(db, "chats"),
    where("id", "in", chatsIDs)
  );

  const unsubscribe = onSnapshot(chatsQuery, (querySnapshot) => {
    querySnapshot.docChanges().forEach((change) => {
      const changedChatData = change.doc.data() as ChatDataDB;
      const lastMessage = changedChatData.lastMessage;

      if (
        change.type !== "modified" ||
        !lastMessage ||
        querySnapshot.metadata.hasPendingWrites
      ) {
        return;
      }

      dispatch(
        changeLastMessage({
          chatID: changedChatData.id,
          message: {
            ...lastMessage,
            serverTime: convertServerTime(lastMessage.serverTime),
          },
        })
      );
      const { activeChat, currentUser } = store.getState();
      if (
        activeChat.id !== changedChatData.id &&
        currentUser.email !== lastMessage.author.email &&
        !currentUser.chats[changedChatData.id].isMuted
      ) {
        enqueueSnackbar(lastMessage.messageText, {
          variant: "messageNotification",
          anchorOrigin: { vertical: "bottom", horizontal: "left" },
          messageAuthor: lastMessage.author,
          chatID: changedChatData.id,
        });
      }
    });
  });
  return unsubscribe;
};
