import {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import ChatsList from "../Components/Chat selection/ChatsList";
import { db } from "../firebase-config";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectDialogPartner } from "../redux/slices/dialogPartner";
import { selectCurrentUser } from "../redux/slices/currentUser";
import SearchUser from "../Components/Chat selection/SearchUser";
import Chat from "../Components/Chat/Chat";
import { fetchChats } from "../Services/fetchChats";
import { createChat } from "../Services/createChat";
import { selectAllChats } from "../redux/slices/chats";
import { useActiveChat } from "../Components/Hooks/useActiveChat";

export interface ChatData {
  chatDocRef: DocumentReference<DocumentData, DocumentData>;
  members: string[];
  show: boolean;
}

export interface ChatsState {
  [key: string]: ChatData;
}

const MainPage = () => {
  const chats = useAppSelector(selectAllChats);
  const { email: currentUserEmail } = useAppSelector(selectCurrentUser);
  const { email: dialogPartnerEmail } = useAppSelector(selectDialogPartner);

  const [chatDocRef, setChatDocRef] = useState<
    DocumentReference<DocumentData, DocumentData>
  >(doc(db, "chats/mainChat"));
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchChats(currentUserEmail!));
  }, []);
  useActiveChat();

  return (
    <div className="grow max-h-screen flex pt-[82px]">
      <div className="w-[35%] p-3 flex flex-col gap-5">
        <SearchUser />
        <ChatsList
          dialogs={Object.values(chats).filter((d) => d.lastMessage)}
        />
      </div>

      <Chat chatDocRef={chatDocRef} />
    </div>
  );
};

export default MainPage;
