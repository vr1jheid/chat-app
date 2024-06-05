import { Autocomplete } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useAppSelector } from "../../Store/hooks";
import { setActiveChat } from "../../Hooks/useActiveChat";
import { selectAllUsersList } from "../../Store/AllUsersList/allUsersList";

export interface UserWithLabel {
  label: string;
}

const SearchUser = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectedUserEmail, setSelectedUserEmail] = useState<string | null>(
    null
  );
  const usersList = useAppSelector(selectAllUsersList);

  const onOptionSelect = (
    _e: React.SyntheticEvent<Element, Event>,
    newValue: string | null
  ) => {
    if (!newValue) return;
    setSelectedUserEmail(newValue);
    setActiveChat(newValue);
  };

  const onInputChange = (
    _e: React.SyntheticEvent<Element, Event>,
    newValue: string
  ) => {
    setInputValue(newValue);
  };

  return (
    <div className="flex items-center gap-3 bg-gray-very-light h-fit rounded py-2 focus-within:outline outline-purple-main outline-2">
      <Autocomplete
        sx={{ flexGrow: 1 }}
        value={selectedUserEmail}
        onChange={onOptionSelect}
        inputValue={inputValue}
        onInputChange={onInputChange}
        onBlur={() => setSelectedUserEmail(null)}
        options={inputValue ? usersList : []}
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
