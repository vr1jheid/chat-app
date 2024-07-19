import clsx from "clsx";
import { memo } from "react";

import { MessageAuthor } from "../../../Types/messageTypes";
import getTimeFromTimestamp from "../../../utils/getTimeFromTimestamp";
import { Loader } from "../../Shared/Loader";
import { UserAvatar } from "../../Shared/UserAvatar";

interface Props {
  id: string;
  isMyself?: boolean;
  text: string;
  timestamp: number | null;
  deleteMessageFunc?: () => void;
  author?: MessageAuthor | null;
  onAuthorClick?: () => void;
}

export const Message = memo(
  ({
    author,
    text,
    timestamp,
    isMyself = !author,
    deleteMessageFunc,
    onAuthorClick,
  }: Props) => {
    const time = timestamp
      ? getTimeFromTimestamp(timestamp)
      : getTimeFromTimestamp(Date.now());

    return (
      <div
        className="flex items-end w-fit max-w-[80%] gap-2"
        onClick={deleteMessageFunc}
      >
        {author && !isMyself && (
          <button
            className="cursor-pointer h-10 w-10 min-w-10 -translate-y-1"
            onClick={onAuthorClick}
          >
            <UserAvatar alt={author.displayName} src={author.avatarURL} />
          </button>
        )}

        <div
          className={clsx(
            "rounded-2xl text-white flex flex-col gap-1 lg:gap-3 max-w-full bg-gray-light p-2 lg:px-4 relative",
            {
              "bg-purple-main": isMyself,
            }
          )}
        >
          {!timestamp && (
            <div className="absolute bottom-0 -left-2 h-10 w-10 -translate-x-full">
              <Loader />
            </div>
          )}
          {author && !isMyself && (
            <div
              onClick={onAuthorClick}
              className="text-purple-main text-left cursor-pointer"
            >
              {author.displayName}
            </div>
          )}

          <div className="flex flex-row-reverse  max-w-full gap-3 justify-between">
            <div className=" text-base lg:text-xl break-words w-[80%] grow text-left">
              {text}
              <span
                className={clsx(
                  " inline-block ml-3 text-gray-extra-light lg:text-sm text-xs  float-right translate-y-1/2",
                  {
                    "text-purple-extra-light": isMyself,
                  }
                )}
              >
                {time}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
