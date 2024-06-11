import SendMessageForm from "./MessageInput";
import ChatHeader from "./ChatHeader";
import { useSubChat } from "../../Hooks/useSubChat";
import { ChatBody } from "./MessagesList/ChatBody";

const Chat = () => {
  useSubChat();
  return (
    <div className="pb-5 max-h-full h-full relative grow mx-auto bg-transparent flex items-center flex-col overflow-y-auto">
      <ChatHeader />
      <ChatBody />
      <SendMessageForm />
    </div>
  );
};

export default Chat;
