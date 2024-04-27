import ChatsList from "../Components/Chat selection/ChatsList";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectCurrentUser } from "../redux/slices/currentUser";
import SearchUser from "../Components/Chat selection/SearchUser";
import Chat from "../Components/Chat/Chat";
import { fetchChats } from "../Services/fetchChats";
import { Divider } from "@mui/material";

const MainPage = () => {
  const dispatch = useAppDispatch();
  const { email: currentUserEmail } = useAppSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(fetchChats(currentUserEmail!));
  }, []);

  return (
    <div className="grow max-h-screen flex pt-[82px]">
      <div className="w-[35%] p-3 flex flex-col gap-5 bg-[#212121]">
        <SearchUser />
        <Divider sx={{ border: "1px solid black" }} />
        <ChatsList />
      </div>

      <Chat />
    </div>
  );
};

export default MainPage;
