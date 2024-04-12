import {
  DocumentData,
  DocumentReference,
  QueryDocumentSnapshot,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import Chat from "../Components/Chat/Chat";
import ChatsList from "../Components/ChatsList";
import { v4 as uuidv4 } from "uuid";
import { useChatDocRef } from "../utils/useChatDocRef";
import { db } from "../firebase-config";
import { FirebaseError } from "firebase/app";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { selectDialogPartner } from "../redux/slices/dialogPartner";
import { selectUserEmail } from "../redux/slices/currentUser";

interface DialogData {
  chatDocRef: DocumentReference<DocumentData, DocumentData>;
  members: string[];
}

const MainPage = () => {
  const [dialogs, setDialogs] = useState<DialogData[]>([]);
  const currentUserEmail = useAppSelector(selectUserEmail) as string;
  const { email: dialogPartnerEmail } = useAppSelector(selectDialogPartner);
  /*   console.log(dialogPartnerEmail); */

  const [chatDocRef, setChatDocRef] = useState<
    DocumentReference<DocumentData, DocumentData>
  >(doc(db, "chats/mainChat"));

  useEffect(() => {
    const getUserDialogs = async () => {
      const q = query(
        collection(db, "chats"),
        where("members", "array-contains", currentUserEmail)
      );
      const querySnaphot = await getDocs(q);
      const dialogs: DialogData[] = [];
      querySnaphot.forEach((snapshotDoc) => {
        const { members } = snapshotDoc.data();
        const chatDocRef = doc(db, `chats/${snapshotDoc.id}`);
        dialogs.push({ chatDocRef, members });
      });
      setDialogs(dialogs);
    };
    getUserDialogs();
  }, []);

  useEffect(() => {
    if (!dialogPartnerEmail) {
      return;
    }
    /* console.log(
      dialogs.some((dialog) => dialog.members.includes(dialogPartnerEmail))
    ); */
    const docRefFromDialogs = dialogs.find((d) =>
      d.members.includes(dialogPartnerEmail)
    );

    if (docRefFromDialogs) {
      console.log(docRefFromDialogs.chatDocRef.id, "АЙДИ");

      setChatDocRef(docRefFromDialogs.chatDocRef);
      return;
    }

    const createNewChatDoc = async () => {
      const newChatDocRef = await addDoc(collection(db, "chats"), {
        members: [currentUserEmail, dialogPartnerEmail],
      });
      setChatDocRef(newChatDocRef);
      setDialogs([
        ...dialogs,
        {
          chatDocRef: newChatDocRef,
          members: [currentUserEmail, dialogPartnerEmail],
        },
      ]);
      console.log(newChatDocRef.id, "АЙДИ");
    };
    createNewChatDoc();
  }, [dialogPartnerEmail]);

  return (
    <div className="grow max-h-screen flex pt-[82px]">
      <ChatsList />
      <Chat chatDocRef={chatDocRef} />
    </div>
  );
};

export default MainPage;
