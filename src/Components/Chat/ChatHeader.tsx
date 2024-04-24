import { memo, useEffect, useState } from "react";
import renderAvatar from "../../utils/renderAvatar";
import { useAppSelector } from "../../redux/hooks";
import { selectActiveChat } from "../../redux/slices/chats";
import { selectCurrentUser } from "../../redux/slices/currentUser";
import getUserFromDB from "../../Services/getUserFromDB";
import { ChatTypes } from "../../Types/chatTypes";

const ChatHeader = () => {
  const [headerData, setHeaderData] = useState({ chatName: "", avatarURL: "" });
  const activeChat = useAppSelector(selectActiveChat);
  const { email: currentUserEmail } = useAppSelector(selectCurrentUser);

  useEffect(() => {
    const setHeader = async () => {
      if (activeChat.type === ChatTypes.group) {
        setHeaderData({ ...headerData, chatName: activeChat.id });
        return;
      }

      const dialogPartnerEmail = activeChat.members.find(
        (m) => m !== currentUserEmail
      )!;
      const dialogPartnerData = await getUserFromDB(dialogPartnerEmail)!;
      if (!dialogPartnerData) return;

      setHeaderData({
        avatarURL: dialogPartnerData.avatarURL ?? "",
        chatName: dialogPartnerData.displayName ?? dialogPartnerData.email,
      });
    };
    setHeader();
  }, [activeChat]);

  return (
    <header className="flex w-full items-center justify-center gap-4 text-3xl p-2 bg-slate-600 text-white">
      {headerData.chatName}
      {renderAvatar(headerData.chatName, headerData.avatarURL)}{" "}
    </header>
  );
};

export default memo(ChatHeader);
