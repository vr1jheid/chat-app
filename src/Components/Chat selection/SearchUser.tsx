import { Autocomplete, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/slices/currentUser";
import getAllUsersEmailsFromDB from "../../Services/getAllUsersEmailsFromDB";
import { useActiveChat } from "../Hooks/useActiveChat";

export interface UserWithLabel {
  label: string;
}

const SearchUser = () => {
  const [usersList, setUsersList] = useState<string[]>(["EMPTY"]);
  const [selectedUserEmail, setSelectedUserEmail] = useState<string | null>(
    null
  );

  const { email: currentUserEmail } = useAppSelector(selectCurrentUser);
  const setActiveChat = useActiveChat(selectedUserEmail);

  useEffect(() => {
    const fillUsersList = async () => {
      const usersEmailsFromDB = await getAllUsersEmailsFromDB();
      setUsersList(
        usersEmailsFromDB.filter((email) => email !== currentUserEmail)
      );
    };
    fillUsersList();
  }, []);

  useEffect(() => {
    setActiveChat();
  }, [selectedUserEmail]);

  return (
    <div className="flex items-center gap-3">
      <SearchIcon sx={{ width: 35, height: 35 }} />
      <Autocomplete
        value={selectedUserEmail}
        onChange={(e, newValue) => {
          setSelectedUserEmail(newValue);
          /*  setSelectedUser(null); */
        }}
        disablePortal
        options={usersList}
        sx={{ flexGrow: "1" }}
        renderInput={(params) => <TextField {...params} label="Enter email" />}
      ></Autocomplete>
    </div>
  );
};

export default SearchUser;
