import ChatsList from "../Components/Chat selection/ChatsList";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectCurrentUser } from "../redux/slices/currentUser";
import SearchUser from "../Components/Chat selection/SearchUser";
import Chat from "../Components/Chat/Chat";
import { fetchChats } from "../Services/fetchChats";

const MainPage = () => {
  const dispatch = useAppDispatch();
  const { email: currentUserEmail } = useAppSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(fetchChats(currentUserEmail!));
  }, []);

  return (
    <div className="grow max-h-screen flex pt-[82px]">
      <div className="w-[35%] p-3 flex flex-col gap-5">
        <SearchUser />
        <ChatsList />
      </div>

      <Chat />
    </div>
  );
};

export default MainPage;
