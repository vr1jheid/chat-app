import { useEffect, useState } from "react";
import getUserFromDB from "../../Services/getUserFromDB";
import { UserDataDB } from "../../Types/userTypes";
import { ChatDataDB, ChatTypes } from "../../Types/chatTypes";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/slices/currentUser";
import getTimeFromTimestamp from "../../utils/getTimeFromTimestamp";
import UserAvatar from "../UserAvatar";

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
  const [isActive, setIsActive] = useState(false);

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

  return (
    <div
      className={`max-w-full h-fit text-xl bg-[#202b36] text-white rounded p-2 flex items-center gap-7 relative truncate`}
    >
      <UserAvatar
        alt={previewData.chatName}
        src={previewData.avatarURL}
        size={55}
      />
      <div className="flex flex-col gap-2">
        <div className=" text-2xl">{previewData.chatName}</div>
        <div className="text-[#91a3b5] truncate">
          {chatData.lastMessage?.messageText}
        </div>
      </div>
      <div className="text-[#91a3b5] text-xl self-start grow text-right">
        {getTimeFromTimestamp(chatData.lastMessage?.serverTime?.seconds!)}
      </div>
    </div>
  );
};

export default ChatPreview;
