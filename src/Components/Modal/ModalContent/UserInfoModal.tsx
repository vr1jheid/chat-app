import { MessageAuthor } from "../../../Types/messageTypes";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PersonIcon from "@mui/icons-material/Person";
import { UserInfoListItem } from "./UserInfoListItem";

interface Props {
  userInfo: MessageAuthor;
}

export const UserInfoModal = ({ userInfo }: Props) => {
  console.log(userInfo);

  return (
    <div className="w-[95vw] h-[80dvh] p-2 bg-gray-light rounded-xl text-white">
      <div className="h-[45%] relative mb-7">
        <img
          className="block w-full rounded-xl h-full object-cover"
          src={userInfo.avatarURL}
          alt="avatar"
        />
      </div>
      <ul className="flex flex-col justify-center text-xl">
        <UserInfoListItem icon={<PersonIcon />}>
          <>{userInfo.displayName}</>
        </UserInfoListItem>
        <UserInfoListItem icon={<AlternateEmailIcon />}>
          <>{userInfo.email}</>
        </UserInfoListItem>
      </ul>
    </div>
  );
};
