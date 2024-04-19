import { createChat } from "../../Services/createChat";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectAllChats, setActive } from "../../redux/slices/chats";
import { selectCurrentUser } from "../../redux/slices/currentUser";
import { ChatTypes } from "../Types/chatTypes";

export const useActiveChat = (dialogPartnerEmail: string | null) => {
  const dispatch = useAppDispatch();
  const chats = useAppSelector(selectAllChats);
  const { email: currentUserEmail } = useAppSelector(selectCurrentUser);

  return () => {
    if (!dialogPartnerEmail) return;
    const entry = Object.entries(chats).find(
      ([key, value]) =>
        value.type === ChatTypes.dialog &&
        value.members?.includes(dialogPartnerEmail)
    );
    if (entry) {
      /* Если диалог уже есть берем ссылку из массива диалогов */
      const [id, chat] = entry;
      dispatch(setActive(id));
      return;
    }

    dispatch(createChat([currentUserEmail, dialogPartnerEmail]));
  };
};
