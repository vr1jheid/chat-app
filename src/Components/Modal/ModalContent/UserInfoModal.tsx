import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";

import { useAppDispatch } from "../../../Store/hooks";
import { closeModal } from "../../../Store/Modal/modalSlice";
import { MessageAuthor } from "../../../Types/messageTypes";
import { UserAvatar } from "../../Shared/UserAvatar";
import { UserInfoListItem } from "./UserInfoListItem";

interface Props {
  userInfo: MessageAuthor;
}

export const UserInfoModal = ({ userInfo }: Props) => {
  const dispatch = useAppDispatch();
  return (
    <div className="w-[95vw] h-[60dvh] max-w-[420px] p-2 bg-gray-light rounded-xl text-white relative">
      <div className="h-[85%] relative mb-2">
        <UserAvatar
          src={userInfo.avatarURL}
          alt={userInfo.displayName}
          variant="rounded"
        />
      </div>
      <ul className="flex flex-col justify-center text-xl">
        <UserInfoListItem icon={<PersonIcon />}>
          <>{userInfo.displayName}</>
        </UserInfoListItem>
      </ul>
      <button
        onClick={() => dispatch(closeModal())}
        className="absolute top-3 right-3 hidden sm:block  opacity-50 hover:bg-[#00000042]  rounded-full    hover:opacity-100"
      >
        <CloseIcon fontSize="large" />
      </button>
    </div>
  );
};
