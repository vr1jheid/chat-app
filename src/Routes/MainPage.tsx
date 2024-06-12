import ChatsList from "../Components/Chat selection/ChatsList";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import SearchUser from "../Components/Chat selection/SearchUser";
import Chat from "../Components/Chat/Chat";
import {
  clearActiveChat,
  selectActiveChatID,
} from "../Store/ActiveChat/activeChat";
import ChatContextContainer from "../Components/Chat/ChatContextContainer";

const MainPage = () => {
  const dispatch = useAppDispatch();
  const activeChatID = useAppSelector(selectActiveChatID);

  useEffect(() => {
    const clearActiveChatFunc = (e: KeyboardEvent) => {
      if (e.code === "Escape" && activeChatID) {
        dispatch(clearActiveChat());
      }
    };
    window.addEventListener("keydown", clearActiveChatFunc);

    return () => {
      window.removeEventListener("keydown", clearActiveChatFunc);
    };
  }, [activeChatID]);

  return (
    <div className="grow max-h-screen flex pt-[82px]">
      {
        <button
          onClick={() => {}}
          className=" absolute z-50 left-0 bottom-0 size-10 bg-white"
        >
          test
        </button>
      }
      <div className="min-w-[25%] w-[25%] p-3 flex flex-col gap-5 bg-gray-light border-r-2 border-solid  border-gray-very-light ">
        <SearchUser />
        <ChatsList />
      </div>
      <div className={`bg-gray-dark grow max-h-full bg-cats-svg`}>
        {activeChatID && (
          <ChatContextContainer>
            <Chat />
          </ChatContextContainer>
        )}
      </div>
    </div>
  );
};

export default MainPage;
