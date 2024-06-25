import { Outlet } from "react-router-dom";
import { useWindowResize } from "./Hooks/useWindowResize";
import { enqueueSnackbar } from "notistack";
import store from "./Store/store";

function App() {
  useWindowResize();
  return (
    <>
      <Outlet />
      <button
        onClick={() => {
          const { chats } = store.getState();
          const mainChat = chats["mainChat"];
          enqueueSnackbar(mainChat.lastMessage?.messageText, {
            variant: "messageNotification",
            anchorOrigin: { vertical: "top", horizontal: "center" },
            messageAuthor: mainChat.lastMessage?.author!,
            chatID: "mainChat",
            type: "mobile",
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
