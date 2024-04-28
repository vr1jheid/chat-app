import ChatsList from "../Components/Chat selection/ChatsList";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectCurrentUser } from "../redux/slices/currentUser";
import SearchUser from "../Components/Chat selection/SearchUser";
import Chat from "../Components/Chat/Chat";
import { fetchChats } from "../Services/fetchChats";
import { Divider } from "@mui/material";
import { clearActiveChat, selectActiveChat } from "../redux/slices/chats";

const MainPage = () => {
  const dispatch = useAppDispatch();
  const { email: currentUserEmail } = useAppSelector(selectCurrentUser);
  const { id: activeChatID } = useAppSelector(selectActiveChat);

  useEffect(() => {
    dispatch(fetchChats(currentUserEmail!));
  }, []);

  useEffect(() => {
    const clearActiveChatFunc = (e: KeyboardEvent) => {
      console.log(activeChatID);

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
      <div className="min-w-[25%] p-3 flex flex-col gap-5 bg-[#212121]">
        <SearchUser />
        <Divider sx={{ border: "1px solid black" }} />
        <ChatsList />
      </div>

      {activeChatID && <Chat />}
    </div>
  );
};

export default MainPage;
