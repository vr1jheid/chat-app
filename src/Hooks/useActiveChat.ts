import { createChat } from "../Store/ActiveChat/thunks/createChat";
import { ChatTypes } from "../Types/chatTypes";
import store from "../Store/store";
import { selectChatFromObserved } from "../Store/Chats/thunks/selectChat";

export const setActiveChat = (dialogPartnerEmail: string) => {
  const { chats, currentUser } = store.getState();
  const dispatch = store.dispatch;
  const entry = Object.entries(chats).find(
    ([_, value]) =>
      value.type === ChatTypes.dialog &&
      value.members?.includes(dialogPartnerEmail)
  );

  /* Если чат уже есть берем ссылку из массива чатов */
  if (entry) {
    const [_, chat] = entry;
    dispatch(selectChatFromObserved(chat.id));
    return;
  }

  /*  Иначе, создаем новый */
  dispatch(createChat([currentUser.email, dialogPartnerEmail]));
};
