import { memo, useEffect, useState } from "react";
import UserAvatar from "../Shared/UserAvatar";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { selectCurrentUser } from "../../Store/CurrentUser/currentUser";
import getUserFromDB from "../../Services/getUserFromDB";
import { ChatTypes } from "../../Types/chatTypes";
import { selectActiveChat } from "../../Store/ActiveChat/activeChat";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { clearActiveChatWithCache } from "../../Store/ActiveChat/thunks/clearActiveChat";

const ChatHeader = () => {
  const dispatch = useAppDispatch();
  const [headerData, setHeaderData] = useState({ chatName: "", avatarURL: "" });
  const activeChat = useAppSelector(selectActiveChat);
  const { email: currentUserEmail } = useAppSelector(selectCurrentUser);

  useEffect(() => {
    const setHeader = async () => {
      if (activeChat.type === ChatTypes.group) {
        setHeaderData({ avatarURL: "", chatName: activeChat.id });
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
  }, [activeChat.id]);

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
        <UserAvatar alt={headerData.chatName} src={headerData.avatarURL} />
        <div className="">{headerData.chatName}</div>
      </div>

      {/* <span className=" text-xs">{activeChat.id}</span> */}
    </header>
  );
};

export default memo(ChatHeader);
