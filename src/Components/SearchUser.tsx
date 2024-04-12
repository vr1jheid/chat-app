import { Autocomplete, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { UserWithLabel } from "./ChatsList";
import { useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import {
  clearDialogPartner,
  setDialogPartner,
} from "../redux/slices/dialogPartner";

interface Props {
  options: UserWithLabel[];
}

const SearchUser = ({ options }: Props) => {
  const [selectedUser, setSelectedUser] = useState<UserWithLabel | null>(null);
  const dispatch = useAppDispatch();
  return (
    <div className="flex items-center gap-3">
      <SearchIcon sx={{ width: 35, height: 35 }} />
      <Autocomplete
        value={selectedUser}
        onChange={(e, newValue) => {
          if (!newValue) {
            dispatch(clearDialogPartner());
            return;
          }
          dispatch(setDialogPartner(newValue.userData));
          setSelectedUser(null);
        }}
        disablePortal
        options={options}
        sx={{ flexGrow: "1" }}
        renderInput={(params) => <TextField {...params} label="Enter email" />}
      ></Autocomplete>
    </div>
  );
};

export default SearchUser;
