import { createChat } from "../Services/createChat";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import { selectAllChats } from "../Store/Chats/chats";
import { selectCurrentUser } from "../Store/CurrentUser/currentUser";
import { ChatTypes } from "../Types/chatTypes";
import { setActive } from "../Store/ActiveChat/activeChat";

export const useActiveChat = (dialogPartnerEmail: string | null) => {
  const dispatch = useAppDispatch();
  const chats = useAppSelector(selectAllChats);
  const { email: currentUserEmail } = useAppSelector(selectCurrentUser);

  return () => {
    if (!dialogPartnerEmail) return;
    const entry = Object.entries(chats).find(
      ([, value]) =>
        value.type === ChatTypes.dialog &&
        value.members?.includes(dialogPartnerEmail)
    );
    if (entry) {
      /* Если диалог уже есть берем ссылку из массива диалогов */
      const [, chat] = entry;
      dispatch(setActive(chat));
      return;
    }

    dispatch(createChat([currentUserEmail, dialogPartnerEmail]));
  };
};
