import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { memo } from "react";

import {
  selectActiveChatDialogPartner,
  selectActiveChatID,
} from "../../Store/ActiveChat/activeChat";
import { clearActiveChatWithCache } from "../../Store/ActiveChat/thunks/clearActiveChatWithCache";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { selectWindowSize } from "../../Store/WindowSize/windowSize";
import { UserAvatar } from "../Shared/UserAvatar";

export const ChatHeader = memo(() => {
  const dispatch = useAppDispatch();
  const activeChatID = useAppSelector(selectActiveChatID);
  const dialogPartner = useAppSelector(selectActiveChatDialogPartner);
  const { width } = useAppSelector(selectWindowSize);

  const chatName = dialogPartner?.displayName ?? activeChatID;
  const chatAvatar = dialogPartner?.avatarURL;

  const iconSize = width > 1024 ? 35 : 25;
  const avatarSize = width > 1024 ? 50 : 35;
  return (
    <header className="flex w-full items-center text-xl lg:text-3xl p-1  lg:p-2 bg-gray-light text-white">
      <button
        className="p-2 rotate-90 rounded-full block lg:hidden"
        onClick={() => {
          dispatch(clearActiveChatWithCache());
        }}
      >
        <ArrowDownwardIcon sx={{ width: iconSize, height: iconSize }} />
      </button>
      <div className="flex gap-3 items-center ml-7">
        <UserAvatar alt={chatName} src={chatAvatar} size={avatarSize} />
        <div className="">{chatName}</div>
      </div>
    </header>
  );
});
