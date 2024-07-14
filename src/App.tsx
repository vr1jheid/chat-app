import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { store } from "./Store/store";
import { ChatLocalCache } from "./Types/chatTypes";
import { useWindowResize } from "./Hooks/useWindowResize";
import { ModalManager } from "./Components/ModalManager/ModalManager";
import { useAppDispatch } from "./Store/hooks";
import { setModal } from "./Store/Modal/modalSlice";

export const App = () => {
  useWindowResize();
  const dispatch = useAppDispatch();

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

  const testFunc = () => {
    dispatch(setModal({ type: "userInfo", data: null }));
  };

  return (
    <>
      <Outlet />
      <ModalManager />

      <button
        onClick={testFunc}
        className="absolute z-50 bg-white p-5 top-0 right-0"
      >
        TEST
      </button>
    </>
  );
};
