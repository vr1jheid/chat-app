import { doc } from "firebase/firestore";
import { useEffect } from "react";
import { createChat } from "../../Services/createChat";
import { db } from "../../firebase-config";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectAllChats } from "../../redux/slices/chats";
import { selectDialogPartner } from "../../redux/slices/dialogPartner";
import { selectCurrentUser } from "../../redux/slices/currentUser";

export const useActiveChat = () => {
  const dispatch = useAppDispatch();
  const chats = useAppSelector(selectAllChats);
  const { email: currentUserEmail } = useAppSelector(selectCurrentUser);

  const { email: dialogPartnerEmail } = useAppSelector(selectDialogPartner);

  useEffect(() => {
    /*
      Меняем чат (ссылку на документ с сообщениями) в зависимости от выбранного собеседника
    */
    if (!dialogPartnerEmail) {
      return;
    }

    const entry = Object.entries(chats).find(([key, value]) =>
      value.members?.includes(dialogPartnerEmail)
    );
    if (entry) {
      /* Если диалог уже есть берем ссылку из массива диалогов */
      const [id, chat] = entry;
      return;
    }
    dispatch(createChat([currentUserEmail!, dialogPartnerEmail]));
  }, [dialogPartnerEmail]);
};
