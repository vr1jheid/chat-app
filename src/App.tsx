import { Outlet } from "react-router-dom";
import { useWindowResize } from "./Hooks/useWindowResize";
import { useEffect } from "react";
import store from "./Store/store";
import { ChatLocalCache } from "./Types/chatTypes";
import { enqueueSnackbar } from "notistack";

function App() {
  useWindowResize();

  useEffect(() => {
    window.addEventListener("unload", () => {
      const { activeChat } = store.getState();
      if (activeChat.messages.length && activeChat.id) {
        const localCache: ChatLocalCache = {
          cachedMessages: activeChat.messages,
          hasNextPage: activeChat.hasNextPage,
        };
        localStorage.setItem(activeChat.id, JSON.stringify(localCache));
      }
    });
  }, []);

  return (
    <>
      <Outlet />
      <button
        onClick={() => {
          enqueueSnackbar("Test text", {
            variant: "messageNotification",
            anchorOrigin: {
              vertical: window.innerWidth > 1024 ? "bottom" : "top",
              horizontal: window.innerWidth > 1024 ? "left" : "center",
            },
            messageAuthor:
              store.getState().chats["mainChat"].cachedMessages[0].author,
            chatID: "mainChat",
            persist: true,
          });
        }}
        className="absolute z-50 bg-white p-5 top-0 right-0"
      >
        TEST
      </button>
    </>
  );
}

export default App;
