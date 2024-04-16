import { useEffect, useState } from "react";
import { ChatData, ChatsState } from "../../Pages/MainPage";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/slices/currentUser";
import { query, collection, where, getDocs, doc } from "firebase/firestore";
import { db } from "../../firebase-config";

export const useUserChats = () => {
  const [chats, setChats] = useState<ChatsState>({});
  const { email: currentUserEmail } = useAppSelector(selectCurrentUser);

  useEffect(() => {
    const getUserDialogs = async () => {
      const q = query(
        collection(db, "chats"),
        where("chatInfo.members", "array-contains", currentUserEmail)
      );

      const querySnaphot = await getDocs(q);
      const chatsFromDB: ChatsState = {};

      querySnaphot.forEach((snapshotDoc) => {
        const docData = snapshotDoc.data();
        console.log(docData);

        const { members } = docData.chatInfo;
        const chatDocRef = doc(db, `chats/${snapshotDoc.id}`);
        const chatData: ChatData = {
          chatDocRef,
          members,
          show: Boolean(docData.messages),
        };
        chatsFromDB[snapshotDoc.id] = chatData;
      });
      console.log(chats);

      setChats(chatsFromDB);
    };
    getUserDialogs();
  }, []);

  return [chats, setChats] as [
    ChatsState,
    setChats: React.Dispatch<React.SetStateAction<ChatsState>>
  ];
};
