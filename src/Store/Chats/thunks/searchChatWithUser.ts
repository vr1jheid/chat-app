import { createAsyncThunk } from "@reduxjs/toolkit";

import { ChatTypes } from "../../../Types/chatTypes";
import { createChat } from "../../ActiveChat/thunks/createChat";
import { RootState } from "../../store";
import { selectChatFromObserved } from "./selectChatFromObserved";

export const searchChatWithUser = createAsyncThunk(
  "searchChatWithUser",
  (dialogPartnerEmail: string, { getState, dispatch }) => {
    const { chatsList } = getState() as RootState;
    const { chats } = chatsList;

    const entry = Object.entries(chats).find(
      ([_, value]) =>
        value.type === ChatTypes.dialog &&
        value.members?.includes(dialogPartnerEmail)
    );

    /* Если чат уже есть берем ссылку из массива чатов */
    if (entry) {
      const [_, chat] = entry;
      dispatch(selectChatFromObserved(chat.id));
      return;
    }

    /*  Иначе, создаем новый */
    dispatch(createChat([dialogPartnerEmail]));
  }
);
