import { memo } from "react";
import renderAvatar from "../../utils/renderAvatar";
import { useAppSelector } from "../../redux/hooks";
import { selectDialogPartner } from "../../redux/slices/dialogPartner";

const ChatHeader = () => {
  console.log("chat header rerender");
  const { email, displayName, avatarURL } = useAppSelector(selectDialogPartner);
  const chatName = displayName || email || "Main Chat";

  return (
    <header className="flex w-full items-center justify-center gap-4 text-3xl p-2 bg-slate-600 text-white">
      {chatName} {renderAvatar(chatName, avatarURL)}{" "}
    </header>
  );
};

export default memo(ChatHeader);
