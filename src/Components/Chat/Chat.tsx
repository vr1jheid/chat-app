import SendMessageForm from "./MessageInput";
import ChatHeader from "./ChatHeader";
import { ChatBody } from "./ChatBody/ChatBody";

const Chat = () => {
  return (
    <div className="lg:pb-5 max-h-full h-full relative grow mx-auto bg-transparent flex items-center flex-col overflow-y-auto">
      <ChatHeader />
      <ChatBody />
      <SendMessageForm />
    </div>
  );
};

export default Chat;
