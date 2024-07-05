import { closeSnackbar } from "notistack";
import { CSSProperties, forwardRef } from "react";
import UserAvatar from "../Shared/UserAvatar";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { selectChatFromObserved } from "../../Store/Chats/thunks/selectChatFromObserved";
import { MessageAuthor } from "../../Types/messageTypes";
import clsx from "clsx";
import { selectWindowSize } from "../../Store/WindowSize/windowSize";
import { useSwipeable } from "react-swipeable";

interface Props {
  style: CSSProperties;
  id: number;
  message: string;
  messageAuthor: MessageAuthor;
  chatID: string;
  type?: "standard" | "mobile";
}

export const MessageNotification = forwardRef<HTMLDivElement, Props>(
  ({ style, message, messageAuthor, id: notiID, chatID }, ref) => {
    const dispatch = useAppDispatch();
    const { width } = useAppSelector(selectWindowSize);
    const { avatarURL, displayName, email } = messageAuthor;
    console.log(ref);

    const closeNoti = () => {
      closeSnackbar(notiID);
    };
    const toChat = () => {
      dispatch(selectChatFromObserved(chatID));
      closeSnackbar(notiID);
    };

    const { ref: swipeRef, ...swipeHandler } = useSwipeable({
      onSwipedUp: closeNoti,
    });
    const mobile = width < 1024;
    return (
      <div
        className={clsx(
          "group flex relative z-[-10] items-center gap-3 bg-gray-dark text-white p-2 rounded-lg h-20 lg:w-80 lg:h-28"
        )}
        style={style}
        {...swipeHandler}
        ref={(node) => {
          if (typeof ref !== "function") return;
          swipeRef(node);
          ref(node);
        }}
        onClick={!mobile ? () => {} : toChat}
      >
        <UserAvatar
          alt={displayName ?? email}
          src={avatarURL}
          size={!mobile ? 70 : 40}
        />
        <div className="flex flex-col gap-1 h-full w-full grow lg:max-w-56 truncate ">
          <div className="text-xl inline-flex items-center justify-between">
            {displayName ?? email}
            <button
              onClick={closeNoti}
              className="rounded-full p-1 hover:bg-gray-extra-light hidden lg:grid place-self-center"
            >
              <CloseIcon className=" text-white" />
            </button>
          </div>
          <div className="text-[#a0a0a0] break-words overflow-hidden truncate max-w-full lg:whitespace-normal">
            {message}
          </div>
          <button
            className="absolute hidden right-5 bottom-5 rounded-lg bg-gray-dark p-2 shadow-3xl hover:bg-purple-main hover:shadow-purple-main hover:shadow-none lg:group-hover:block"
            onClick={toChat}
          >
            REPLY
          </button>
        </div>
      </div>
    );
  }
);
