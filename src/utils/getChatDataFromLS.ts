import { ChatData, ChatLocalCache } from "../Types/chatTypes";

export const getChatDataFromLS = (
  chatID: string
): ChatLocalCache | undefined => {
  const chatData = localStorage.getItem(chatID);
  if (!chatData) return;

  return JSON.parse(chatData) as Pick<
    ChatData,
    "cachedMessages" | "hasNextPage"
  >;
};
