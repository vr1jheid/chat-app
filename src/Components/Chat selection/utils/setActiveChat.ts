import { ChatTypes } from "../../../Types/chatTypes";
import store from "../../../Store/store";
import { setActive } from "../../../Store/ActiveChat/activeChat";
import { createChat } from "../../../Store/ActiveChat/thunks/createChat";

export const setActiveChat = async (dialogPartnerEmail: string) => {
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
    console.log("Entry", chat);
    dispatch(setActive(chat));
    return;
  }

  /*  Иначе, создаем новый */
  dispatch(createChat([currentUser.email, dialogPartnerEmail]));
};
