import { Autocomplete } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/slices/currentUser";
import getAllUsersEmailsFromDB from "../../Services/getAllUsersEmailsFromDB";
import { useActiveChat } from "../../Hooks/useActiveChat";

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
    <div className="flex items-center gap-3 bg-[#2c2c2c] h-fit rounded py-2 focus-within:outline outline-[#766ac8] outline-2">
      <Autocomplete
        value={selectedUserEmail}
        onChange={(_e, newValue) => {
          setSelectedUserEmail(newValue);
        }}
        onBlur={() => setSelectedUserEmail(null)}
        options={usersList}
        renderInput={(params) => (
          <div
            ref={params.InputProps.ref}
            className="h-10 w-full flex px-3 items-center gap-3  "
          >
            <SearchIcon sx={{ width: 35, height: 35, color: "#a0a0a0" }} />
            <input
              placeholder="Search"
              type="text"
              {...params.inputProps}
              className=" h-full block w-full bg-inherit focus-visible:outline-none text-xl text-white"
            />
          </div>
        )}
      ></Autocomplete>
    </div>
  );
};

export default SearchUser;
