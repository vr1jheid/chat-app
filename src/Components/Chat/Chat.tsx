import SendMessageForm from "./MessageInput";
import ChatHeader from "./ChatHeader";
import MessagesList from "./MessagesList/MessagesList";

const Chat = () => {
  return (
    <div className="pb-5 max-h-full h-full relative grow mx-auto bg-transparent flex items-center flex-col overflow-y-auto">
      <ChatHeader />
      <MessagesList />
      <SendMessageForm />
    </div>
  );
};

export default Chat;
