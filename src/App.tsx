import { Outlet } from "react-router-dom";
import { useWindowResize } from "./Hooks/useWindowResize";
import { useEffect } from "react";
import store from "./Store/store";
import { ChatLocalCache } from "./Types/chatTypes";

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
      {/*       <button
        onClick={}
        className="absolute z-50 bg-white p-5 top-0 right-0"
      >
        TEST
      </button> */}
    </>
  );
}

export default App;
