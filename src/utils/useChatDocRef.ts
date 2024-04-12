import { useAppSelector } from "../redux/hooks";
import { selectUser } from "../redux/slices/currentUser";
import { selectDialogPartner } from "../redux/slices/dialogPartner";

export const useChatDocRef = () => {
  const dialogPartner = useAppSelector(selectDialogPartner);
  const currentUser = useAppSelector(selectUser);

  if (!dialogPartner.email) return "";
  return `users/${currentUser.email}/messages/${dialogPartner.email}`;
};
