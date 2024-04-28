import { useEffect, useState } from "react";
import getUserFromDB from "../../Services/getUserFromDB";
import { UserDataDB } from "../../Types/userTypes";
import { ChatDataDB, ChatTypes } from "../../Types/chatTypes";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/slices/currentUser";
import getTimeFromTimestamp from "../../utils/getTimeFromTimestamp";
import UserAvatar from "../Shared/UserAvatar";
import { selectActiveChat, setActive } from "../../redux/slices/chats";
import clsx from "clsx";

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
  const { id: activeChatID } = useAppSelector(selectActiveChat);

  const dispatch = useAppDispatch();
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

  const setActiveChat = () => {
    dispatch(setActive(chatData.id));
  };

  return (
    <div
      className={clsx(
        "max-w-full h-fit text-xl text-white rounded p-2 flex items-center gap-7 truncate",
        { "bg-[#766ac8]": isActive, "hover:bg-[#2f2f2f]": !isActive }
      )}
      onClick={setActiveChat}
    >
      <UserAvatar
        alt={previewData.chatName}
        src={previewData.avatarURL}
        size={55}
      />
      <div className="flex flex-col gap-2 grow">
        <div className="flex justify-between gap-4">
          <div className="text-2xl">{previewData.chatName}</div>
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

export default ChatPreview;
