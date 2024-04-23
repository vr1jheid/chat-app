import { useAppSelector } from "../../redux/hooks";
import { selectAllChats } from "../../redux/slices/chats";
import { selectCurrentUser } from "../../redux/slices/currentUser";
import ChatPreview from "./ChatPreview";

const ChatsList = () => {
  const { email: currentUserEmail } = useAppSelector(selectCurrentUser);
  const chatsList = useAppSelector(selectAllChats);
  /*   console.log(chatsList);
  console.log(Object.values(chatsList).filter((c) => c.lastMessage)); */

  return (
    <section className="flex flex-col gap-2">
      {chatsList &&
        Object.values(chatsList)
          .filter((c) => c.lastMessage)
          .map((d) => {
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
