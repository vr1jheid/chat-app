import { memo } from "react";
import { ChatData, ChatTypes } from "../../Types/chatTypes";
import { useAppSelector } from "../../Store/hooks";
import getTimeFromTimestamp from "../../utils/getTimeFromTimestamp";
import UserAvatar from "../Shared/UserAvatar";
import clsx from "clsx";
import { selectActiveChat } from "../../Store/ActiveChat/activeChat";

interface Props {
  chatData: ChatData;
  clickAction: () => void;
}

const ChatPreview = ({ chatData, clickAction }: Props) => {
  const { id: activeChatID } = useAppSelector(selectActiveChat);
  const isActive = chatData.id === activeChatID;

  const chatName =
    chatData.type === ChatTypes.dialog
      ? chatData.dialogPartner?.displayName ?? ""
      : chatData.id;
  const chatAvatar = chatData.dialogPartner?.avatarURL;

  return (
    <div
      className={clsx(
        "max-w-full h-fit min-h-20 text-xl text-white rounded p-2 flex items-center justify-between truncate cursor-pointer",
        { " bg-purple-main": isActive, "hover:bg-gray-hover": !isActive }
      )}
      onClick={clickAction}
    >
      <UserAvatar alt={chatName} src={chatAvatar} size={55} />
      <div className="flex flex-col gap-2 grow max-w-[calc(100%-80px)]">
        <div className="flex justify-between gap-4">
          <div className="text-2xl max-w-[80%] truncate">{chatName}</div>
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
