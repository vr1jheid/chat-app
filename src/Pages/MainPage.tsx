import {
  DocumentData,
  DocumentReference,
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import ChatsList from "../Components/Chat selection/ChatsList";
import { db } from "../firebase-config";
import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { selectDialogPartner } from "../redux/slices/dialogPartner";
import { selectCurrentUser } from "../redux/slices/currentUser";
import SearchUser from "../Components/Chat selection/SearchUser";
import Chat from "../Components/Chat/Chat";

export interface DialogData {
  chatDocRef: DocumentReference<DocumentData, DocumentData>;
  members: string[];
}

const MainPage = () => {
  const [dialogs, setDialogs] = useState<DialogData[]>([]);
  const { email: currentUserEmail } = useAppSelector(selectCurrentUser);
  const { email: dialogPartnerEmail } = useAppSelector(selectDialogPartner);
  /*   console.log(dialogPartnerEmail); */

  const [chatDocRef, setChatDocRef] = useState<
    DocumentReference<DocumentData, DocumentData>
  >(doc(db, "chats/mainChat"));

  useEffect(() => {
    /* Получем все диалоги пользователя */
    const getUserDialogs = async () => {
      console.log("here");

      const q = query(
        collection(db, "chats"),
        where("chatInfo.members", "array-contains", currentUserEmail)
      );
      const querySnaphot = await getDocs(q);
      const dialogs: DialogData[] = [];
      querySnaphot.forEach((snapshotDoc) => {
        const docData = snapshotDoc.data();

        const { members } = docData.chatInfo;
        const chatDocRef = doc(db, `chats/${snapshotDoc.id}`);
        dialogs.push({ chatDocRef, members });
      });
      setDialogs(dialogs);
    };
    getUserDialogs();
  }, []);

  useEffect(() => {
    /*
      Меняем чат (ссылку на документ с сообщениями) в зависимости от выбранного собеседника
    */
    if (!dialogPartnerEmail) {
      return;
    }

    const docRefFromDialogs = dialogs.find((d) =>
      d.members.includes(dialogPartnerEmail)
    );

    if (docRefFromDialogs) {
      /* Если диалог уже есть берем ссылку из массива диалогов */
      setChatDocRef(docRefFromDialogs.chatDocRef);
      return;
    }

    /* Иначе, создаем новый документ с диалогом */
    const createNewChatDoc = async () => {
      const newChatDocRef = await addDoc(collection(db, "chats"), {
        chatInfo: {
          members: [currentUserEmail, dialogPartnerEmail],
        },
      });
      setChatDocRef(newChatDocRef);
      setDialogs([
        ...dialogs,
        {
          chatDocRef: newChatDocRef,
          members: [currentUserEmail!, dialogPartnerEmail],
        },
      ]);
    };
    createNewChatDoc();
  }, [dialogPartnerEmail]);

  return (
    <div className="grow max-h-screen flex pt-[82px]">
      <div className="w-[35%] p-3 flex flex-col gap-5">
        <SearchUser />
        <ChatsList dialogs={dialogs} />
      </div>

      <Chat chatDocRef={chatDocRef} />
    </div>
  );
};

export default MainPage;
