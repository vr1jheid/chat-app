import { DialogData } from "../Pages/MainPage";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentUser } from "../redux/slices/currentUser";
import ChatPreview from "./ChatPreview";

interface Props {
  dialogs: DialogData[];
}

const ChatsList = ({ dialogs }: Props) => {
  const { email: currentUserEmail } = useAppSelector(selectCurrentUser);

  return (
    <section className="flex flex-col gap-2">
      {dialogs &&
        dialogs.map((d) => {
          const dialogPartnerEmail = d.members.find(
            (m) => m !== currentUserEmail
          );
          if (!dialogPartnerEmail) return;
          return (
            <ChatPreview
              key={dialogPartnerEmail}
              userEmail={dialogPartnerEmail}
            />
          );
        })}
    </section>
  );
};

export default ChatsList;
