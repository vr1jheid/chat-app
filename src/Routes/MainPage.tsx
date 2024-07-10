import { ChatsList } from "../Components/Chat selection/ChatsList";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import { SearchUser } from "../Components/Chat selection/SearchUser";
import { Chat } from "../Components/Chat/Chat";
import { selectActiveChatID } from "../Store/ActiveChat/activeChat";
import { ChatContextContainer } from "../Components/Chat/ChatContextContainer";
import clsx from "clsx";
import UserMenu from "../Components/Header/UserMenu";
import catsSVG from "../Assets/bg-cats.svg";
import { clearActiveChatWithCache } from "../Store/ActiveChat/thunks/clearActiveChatWithCache";

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const activeChatID = useAppSelector(selectActiveChatID);

  const clearActiveChatFunc = (e: KeyboardEvent) => {
    if (e.code === "Escape" && activeChatID) {
      dispatch(clearActiveChatWithCache());
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", clearActiveChatFunc);
    return () => {
      window.removeEventListener("keydown", clearActiveChatFunc);
    };
  }, [activeChatID]);

  return (
    <div className="grow max-h-dvh h-dvh flex w-screen overflow-hidden">
      <aside
        className={clsx(
          "absolute z-10 h-full w-full p-3 pl-0 flex flex-col gap-5 bg-gray-light border-r-2 border-solid ease-in transition-all  border-gray-very-light lg:static lg:translate-x-0 lg:w-96 xl:w-[25%]",
          {
            "-translate-x-full": activeChatID,
          }
        )}
      >
        <div className="flex">
          <UserMenu />
          <SearchUser />
        </div>

        <ChatsList />
      </aside>
      <div
        style={{ backgroundImage: `url(${catsSVG})` }}
        className={`bg-gray-dark grow max-h-full`}
      >
        {activeChatID && (
          <ChatContextContainer>
            <Chat />
          </ChatContextContainer>
        )}
      </div>
    </div>
  );
};
