import CloseIcon from "@mui/icons-material/Close";
import clsx from "clsx";
import { closeSnackbar } from "notistack";
import { CSSProperties, forwardRef } from "react";
import { useSwipeable } from "react-swipeable";

import { IMessageNotification } from "../../Types/notistack";
import { UserAvatar } from "../Shared/UserAvatar";

interface Props extends IMessageNotification {
  style: CSSProperties;
  id: number;
  message: string;
}

export const MessageNotification = forwardRef<HTMLDivElement, Props>(
  (
    {
      id: notiID,
      style,
      message,
      messageAuthor,
      mobile = false,
      avatarURL,
      onClose,
    },
    ref
  ) => {
    const closeNoti = () => {
      closeSnackbar(notiID);
    };
    const toChat = () => {
      onClose && onClose();
      closeSnackbar(notiID);
    };

    const { ref: swipeRef, ...swipeHandler } = useSwipeable({
      onSwipedUp: closeNoti,
      preventScrollOnSwipe: true,
    });
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
          alt={messageAuthor}
          src={avatarURL}
          size={!mobile ? 70 : 40}
        />
        <div className="flex flex-col gap-1 h-full w-full grow lg:max-w-56 truncate ">
          <div className="text-xl inline-flex items-center justify-between">
            {messageAuthor}
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
