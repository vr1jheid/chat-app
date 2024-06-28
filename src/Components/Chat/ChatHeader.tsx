import { memo } from "react";
import UserAvatar from "../Shared/UserAvatar";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { selectActiveChatID } from "../../Store/ActiveChat/activeChat";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { clearActiveChatWithCache } from "../../Store/ActiveChat/thunks/clearActiveChatWithCache";
import { selectChatByID } from "../../Store/Chats/chats";

const ChatHeader = () => {
  const dispatch = useAppDispatch();
  const activeChatID = useAppSelector(selectActiveChatID);
  const { dialogPartner } = useAppSelector((state) =>
    selectChatByID(state, activeChatID)
  );

  const chatName = dialogPartner?.displayName ?? "";
  const chatAvatar = dialogPartner?.avatarURL;
  return (
    <header className="flex w-full items-center text-3xl p-2 bg-gray-light text-white">
      <button
        className="p-2 rotate-90 rounded-full block lg:hidden"
        onClick={() => {
          dispatch(clearActiveChatWithCache());
        }}
      >
        <ArrowDownwardIcon sx={{ width: 35, height: 35 }} />
      </button>
      <div className="flex gap-3 items-center ml-7">
        <UserAvatar alt={chatName} src={chatAvatar} />
        <div className="">{chatName}</div>
      </div>

      {/* <span className=" text-xs">{activeChat.id}</span> */}
    </header>
  );
};

export default memo(ChatHeader);
