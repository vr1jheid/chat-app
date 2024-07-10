import { memo } from "react";
import { ChatData, ChatTypes } from "../../Types/chatTypes";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import getTimeFromTimestamp from "../../utils/getTimeFromTimestamp";
import { UserAvatar } from "../Shared/UserAvatar";
import clsx from "clsx";
import { selectActiveChat } from "../../Store/ActiveChat/activeChat";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import { selectChatParams } from "../../Store/CurrentUser/currentUser";
import { changeChatVolume } from "../../Store/CurrentUser/thunks/changeChatVolume";
import { Badge } from "@mui/material";

interface Props {
  chatData: ChatData;
  clickAction: () => void;
}

export const ChatPreview = memo(({ chatData, clickAction }: Props) => {
  const dispatch = useAppDispatch();
  const { id: activeChatID } = useAppSelector(selectActiveChat);
  const isActive = chatData.id === activeChatID;
  const params = useAppSelector((state) =>
    selectChatParams(state, chatData.id)
  );

  const chatName =
    chatData.type === ChatTypes.dialog
      ? chatData.dialogPartner?.displayName ?? ""
      : chatData.id;
  const chatAvatar = chatData.dialogPartner?.avatarURL;

  const changeVolume = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    dispatch(
      changeChatVolume({ chatID: chatData.id, newValue: !params.isMuted })
    );
  };

  return (
    <div
      id={chatData.id}
      className={clsx(
        "max-w-full h-fit min-h-20 text-xl text-white rounded p-2 flex items-center justify-between truncate cursor-pointer relative",
        { " bg-purple-main": isActive, "hover:bg-gray-hover": !isActive }
      )}
      onClick={clickAction}
    >
      <Badge
        badgeContent={chatData.unseenMessages}
        color="secondary"
        max={99}
        overlap="circular"
      >
        <UserAvatar alt={chatName} src={chatAvatar} size={55} />
      </Badge>

      <div className="flex flex-col gap-2 grow max-w-[calc(100%-80px)]">
        <div className="flex justify-between gap-4">
          <div className="text-2xl max-w-[80%] truncate">{chatName}</div>
          <div className="text-xl text-[#a0a0a0]">
            {getTimeFromTimestamp(chatData.lastMessage?.serverTime!)}
          </div>
        </div>

        <div className="text-[#a0a0a0] truncate">
          {chatData.lastMessage?.messageText}
        </div>
      </div>
      <button
        className="absolute bottom-3 right-3 text-[#a0a0a0] rounded-full p-1 hover:bg-slate-100 hover:text-gray-dark grid place-items-center

      "
        onClick={changeVolume}
      >
        {!params.isMuted ? <VolumeUpIcon /> : <VolumeOffIcon />}
      </button>
    </div>
  );
});
