import { useEffect, useState } from "react";
import getUserFromDB from "../../Services/getUserFromDB";
import renderAvatar from "../../utils/renderAvatar";
import { UserDataDB } from "../../Types/userTypes";
import { ChatDataDB, ChatTypes } from "../../Types/chatTypes";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/slices/currentUser";

interface Props {
  chatData: ChatDataDB;
}

interface ChatPreviewData {
  chatName: string;
  avatarURL: string | null;
}

const ChatPreview = ({ chatData }: Props) => {
  const initial = {
    chatName: chatData.id,
    avatarURL: null,
  };
  const { email: currentUserEmail } = useAppSelector(selectCurrentUser);
  const [previewData, setPreviewData] = useState<ChatPreviewData>(initial);
  //const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (chatData.type === ChatTypes.group) {
      return;
    }

    const getDiaLogPartner = async () => {
      const dialogPartnerEmail = chatData.members.find(
        (m) => m !== currentUserEmail
      );

      const dialogPartner = (await getUserFromDB(
        dialogPartnerEmail!
      )) as UserDataDB;
      if (!dialogPartner) return;

      const dialogPartnerName =
        dialogPartner.displayName ?? dialogPartner.email;

      setPreviewData({
        avatarURL: dialogPartner.avatarURL,
        chatName: dialogPartnerName,
      });
    };
    getDiaLogPartner();
  }, []);

  const lastMessageText =
    chatData.lastMessage?.messageText.length! > 30
      ? chatData.lastMessage?.messageText.slice(0, 30) + "..."
      : chatData.lastMessage?.messageText;
  return (
    <div
      className={`w-full h-24 text-2xl bg-[#202b36] text-white rounded p-3 flex items-center gap-7`}
    >
      {renderAvatar(previewData.chatName, previewData.avatarURL, 65)}
      <div className="flex flex-col">
        <span>{previewData.chatName}</span>
        <span className="text-[#91a3b5]">{lastMessageText}</span>
      </div>
    </div>
  );
};

export default ChatPreview;
