import renderAvatar from "../../utils/renderAvatar";

interface Props {
  chatName: string;
  chatIcon: string | null;
}

const ChatHeader = ({ chatName, chatIcon }: Props) => {
  return (
    <header className="flex w-full items-center justify-center gap-4 text-3xl p-2 bg-slate-600 text-white">
      {chatName} {renderAvatar(chatIcon, chatName)}{" "}
    </header>
  );
};

export default ChatHeader;
