import React, { useEffect, useState } from "react";
import { UserDataDB } from "../utils/createUserData";
import getUserFromDB from "../utils/getUserFromDB";
import renderAvatar from "../utils/renderAvatar";

interface Props {
  userEmail: string;
}

const ChatPreview = ({ userEmail }: Props) => {
  const [dialogPartner, setDialogPartner] = useState<UserDataDB | null>(null);
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    const getDiaLogPartner = async () => {
      const dialogPartner = await getUserFromDB(userEmail);
      if (!dialogPartner) return;
      setDialogPartner(dialogPartner);
    };
    getDiaLogPartner();
  }, []);

  if (!dialogPartner) return;
  const dialogPartnerName = dialogPartner.displayName ?? dialogPartner.email;

  return (
    <div
      className={`w-full text-2xl bg-slate-800 text-white rounded p-3 flex items-center gap-7`}
    >
      {renderAvatar(dialogPartnerName, dialogPartner.avatarURL)}
      <div>{dialogPartnerName}</div>
    </div>
  );
};

export default ChatPreview;
