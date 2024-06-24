import { closeSnackbar } from "notistack";
import { forwardRef } from "react";
import { MessageAuthor } from "../../Types/messageTypes";
import UserAvatar from "../Shared/UserAvatar";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch } from "../../Store/hooks";
import { selectChatFromObserved } from "../../Store/Chats/thunks/selectChatFromObserved";

interface Props {
  style: {};
  id: number;
  chatID: string;
  message: string;
  messageAuthor: MessageAuthor;
}

export const MessageNotification = forwardRef<HTMLDivElement, Props>(
  ({ style, message, messageAuthor, id: notiID, chatID }, ref) => {
    const dispatch = useAppDispatch();
    const { avatarURL, displayName, email } = messageAuthor;

    const closeNoti = () => {
      closeSnackbar(notiID);
    };
    const toChat = () => {
      dispatch(selectChatFromObserved(chatID));
      closeSnackbar(notiID);
    };

    return (
      <div
        className="group flex relative z-[-10] items-center gap-3 bg-gray-dark text-white w-80 h-28 p-2 rounded-lg"
        style={style}
        ref={ref}
      >
        <UserAvatar alt={displayName ?? email} src={avatarURL} size={70} />
        <div className=" flex flex-col gap-1 h-full w-full max-w-56 ">
          <div className=" text-xl inline-flex items-center justify-between">
            {displayName ?? email}
            <button
              onClick={closeNoti}
              className=" rounded-full p-1 hover:bg-gray-extra-light grid place-self-center"
            >
              <CloseIcon className=" text-white" />
            </button>
          </div>
          <div className="text-[#a0a0a0] break-words overflow-hidden">
            {message}
          </div>
          <button
            className="absolute hidden right-5 bottom-5 rounded-lg bg-gray-dark p-2 shadow-3xl hover:bg-purple-main hover:shadow-purple-main hover:shadow-none group-hover:block"
            onClick={toChat}
          >
            REPLY
          </button>
        </div>
      </div>
    );
  }
);
