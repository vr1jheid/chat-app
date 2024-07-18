import { collection, onSnapshot, query, where } from "firebase/firestore";
import { enqueueSnackbar } from "notistack";

import { db } from "../main";
import {
  changeLastMessage,
  increaseUnseenMessages,
} from "../Store/Chats/chats";
import { selectChatFromObserved } from "../Store/Chats/thunks/selectChatFromObserved";
import { store } from "../Store/store";
import { ChatDataDB } from "../Types/chatTypes";
import { dbMessageToLocal } from "../utils/dbMessageToLocal";

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
          message: dbMessageToLocal(lastMessage),
        })
      );
      const { activeChat, currentUser } = store.getState();

      if (
        activeChat.id !== changedChatData.id &&
        currentUser.email !== lastMessage.author.email &&
        !currentUser.chats[changedChatData.id].isMuted
      ) {
        const isMobile = window.innerWidth <= 1024;
        enqueueSnackbar(lastMessage.messageText, {
          variant: "messageNotification",
          anchorOrigin: {
            vertical: !isMobile ? "bottom" : "top",
            horizontal: !isMobile ? "left" : "center",
          },
          mobile: isMobile,
          messageAuthor: lastMessage.author.displayName,
          avatarURL: lastMessage.author.avatarURL,
          onClose: () => {
            dispatch(selectChatFromObserved(changedChatData.id));
          },
        });
      }
      if (activeChat.id !== changedChatData.id) {
        dispatch(increaseUnseenMessages(changedChatData.id));
      }
    });
  });
  return unsubscribe;
};
