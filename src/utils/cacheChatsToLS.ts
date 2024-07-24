import { store } from "../Store/store";
import { ChatLocalCache } from "../Types/chatTypes";

export const cacheChatsToLS = () => {
  const { activeChat } = store.getState();

  if (activeChat.messages.length && activeChat.id) {
    const localCache: ChatLocalCache = {
      cachedMessages: activeChat.messages,
      hasNextPage: activeChat.hasNextPage,
    };
    localStorage.setItem(activeChat.id, JSON.stringify(localCache));
  }
};
