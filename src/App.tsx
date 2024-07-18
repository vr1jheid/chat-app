import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { ModalManager } from "./Components/Modal/ModalManager/ModalManager";
import { useWindowResize } from "./Hooks/useWindowResize";
import { selectChatFromObserved } from "./Store/Chats/thunks/selectChatFromObserved";
import { useAppDispatch } from "./Store/hooks";
import { setModal } from "./Store/Modal/modalSlice";
import { store } from "./Store/store";
import { ChatLocalCache } from "./Types/chatTypes";

const mockAuthor = {
  displayName: "ZerO",
  email: "terekhovt@gmail.com",
  avatarURL:
    "https://lh3.googleusercontent.com/a/ACg8ocIuQiTtEM0db5ezW8Tu3QqOxeUgGEQTq3VlMDCPPm6j-63jZ7Lg=s96-c",
};

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

  const setModalFunc = () => {
    dispatch(setModal({ type: "userInfo", data: null }));
  };

  const showNoti = () => {
    enqueueSnackbar("some text", {
      variant: "messageNotification",
      anchorOrigin: {
        vertical: window.innerWidth > 1024 ? "bottom" : "top",
        horizontal: window.innerWidth > 1024 ? "left" : "center",
      },
      messageAuthor: mockAuthor.displayName,
      avatarURL: mockAuthor.avatarURL,
      onClose: () => {
        dispatch(selectChatFromObserved("mainChat"));
      },
    });
  };

  return (
    <>
      <Outlet />
      <ModalManager />

      <button
        onClick={showNoti}
        className="absolute z-50 bg-white p-5 top-0 right-0"
      >
        TEST
      </button>
    </>
  );
};
