import { Outlet } from "react-router-dom";
import { useWindowResize } from "./Hooks/useWindowResize";
import { enqueueSnackbar } from "notistack";
import store from "./Store/store";

function App() {
  useWindowResize();

  const testClick = () => {
    const message = store.getState().activeChat.messages.at(0);
    if (!message) {
      return;
    }
    enqueueSnackbar(message.messageText, {
      variant: "messageNotification",
      persist: true,
      anchorOrigin: { vertical: "bottom", horizontal: "left" },
      messageAuthor: message.author,
      chatID: store.getState().activeChat.id,
    });
  };
  return (
    <>
      <Outlet />
      <button
        onClick={testClick}
        className="absolute z-50 bg-white p-5 top-0 right-0"
      >
        TEST
      </button>
    </>
  );
}

export default App;
