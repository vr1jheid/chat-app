import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../../main";
import { RootState } from "../../store";

interface Props {
  chatID: string;
  newValue: boolean;
}

export const changeChatVolume = createAsyncThunk(
  "chats/volumeChange",
  async ({ chatID, newValue }: Props, { getState }) => {
    const { currentUser } = getState() as RootState;
    await updateDoc(doc(db, `users/${currentUser.email}`), {
      [`userData.chats.${chatID}.isMuted`]: newValue,
    });
  }
);
