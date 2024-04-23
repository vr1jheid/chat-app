import { DocumentData, DocumentReference, doc } from "firebase/firestore";
import ChatsList from "../Components/Chat selection/ChatsList";
import { db } from "../firebase-config";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectDialogPartner } from "../redux/slices/dialogPartner";
import { selectCurrentUser } from "../redux/slices/currentUser";
import SearchUser from "../Components/Chat selection/SearchUser";
import Chat from "../Components/Chat/Chat";
import { fetchChats } from "../Services/fetchChats";
import { selectAllChats } from "../redux/slices/chats";
import { useActiveChat } from "../Components/Hooks/useActiveChat";

const MainPage = () => {
  const dispatch = useAppDispatch();
  const chats = useAppSelector(selectAllChats);
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
