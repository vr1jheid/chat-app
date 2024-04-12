import { doc, setDoc, updateDoc } from "firebase/firestore";
import Chat from "../Components/Chat/Chat";
import ChatsList from "../Components/ChatsList";
import { useChatDocRef } from "../utils/useChatDocRef";
import { db } from "../firebase-config";
import { FirebaseError } from "firebase/app";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

const MainPage = () => {
  const [chatDocRef, setChatDocRef] = useState("chats/mainChat");
  const docRef = useChatDocRef();

  useEffect(() => {
    setChatDocRef(docRef);
  });
  /*   console.log(chatDocRef); */
  /*   const test = async () => {
    const firebaseDocRef = doc(db, chatDocRef);
    try {
      await updateDoc(firebaseDocRef, {
        test: "success",
      });
    } catch (error) {
      if (
        error instanceof FirebaseError &&
        error.message.includes("No document to update")
      ) {
        await setDoc(firebaseDocRef, { test: "success" });
      }
    }
  }; */

  return (
    <div className="grow max-h-screen flex pt-[82px]">
      <ChatsList />
      <Chat documentRef={"chats/mainChat"} />
    </div>
  );
};

export default MainPage;
