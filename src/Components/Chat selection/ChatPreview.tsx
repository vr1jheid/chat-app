import { memo, useEffect, useState } from "react";
import getUserFromDB from "../../Services/getUserFromDB";
import { UserDataDB } from "../../Types/userTypes";
import { ChatDataDB, ChatTypes } from "../../Types/chatTypes";
import { useAppSelector } from "../../Store/hooks";
import { selectCurrentUser } from "../../Store/CurrentUser/currentUser";
import getTimeFromTimestamp from "../../utils/getTimeFromTimestamp";
import UserAvatar from "../Shared/UserAvatar";
import clsx from "clsx";
import { selectActiveChat } from "../../Store/ActiveChat/activeChat";

interface Props {
  chatData: ChatDataDB;
  clickAction: () => void;
}

interface ChatPreviewData {
  chatName: string;
  avatarURL: string | null;
}

const ChatPreview = ({ chatData, clickAction }: Props) => {
  const initial = {
    chatName: chatData.id,
    avatarURL: null,
  };
  const { email: currentUserEmail } = useAppSelector(selectCurrentUser);
  const { id: activeChatID } = useAppSelector(selectActiveChat);

  const [previewData, setPreviewData] = useState<ChatPreviewData>(initial);
  const isActive = chatData.id === activeChatID;

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
      className={clsx(
        "max-w-full h-fit text-xl text-white rounded p-2 flex items-center justify-between truncate",
        { " bg-purple-main": isActive, "hover:bg-gray-hover": !isActive }
      )}
      onClick={clickAction}
    >
      <UserAvatar
        alt={previewData.chatName}
        src={previewData.avatarURL}
        size={55}
      />
      <div className="flex flex-col gap-2 grow max-w-[calc(100%-80px)]">
        <div className="flex justify-between gap-4">
          <div className="text-2xl max-w-[80%] truncate">
            {previewData.chatName}
          </div>
          <div className="text-xl text-[#a0a0a0]">
            {getTimeFromTimestamp(chatData.lastMessage?.serverTime?.seconds!)}
          </div>
        </div>

        <div className="text-[#a0a0a0] truncate">
          {chatData.lastMessage?.messageText}
        </div>
      </div>
    </div>
  );
};

export default memo(ChatPreview);
