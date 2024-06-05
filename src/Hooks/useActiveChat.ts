import { createChat } from "../Store/ActiveChat/thunks/createChat";
import { ChatTypes } from "../Types/chatTypes";
import { setActive } from "../Store/ActiveChat/activeChat";
import store from "../Store/store";

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
    dispatch(setActive(chat));
    return;
  }

  /*  Иначе, создаем новый */
  dispatch(createChat([currentUser.email, dialogPartnerEmail]));
};
