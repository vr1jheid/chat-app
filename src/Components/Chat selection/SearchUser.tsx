import { Autocomplete, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  clearDialogPartner,
  setDialogPartner,
} from "../../redux/slices/dialogPartner";
import { UserDataDB } from "../../utils/createUserData";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase-config";
import { selectCurrentUser } from "../../redux/slices/currentUser";

export interface UserWithLabel {
  label: string | null;
  userData: UserDataDB;
}

const SearchUser = () => {
  const { email: currentUserEmail } = useAppSelector(selectCurrentUser);
  const [usersList, setUsersList] = useState<UserWithLabel[]>([]);
  const dispatch = useAppDispatch();
  const [selectedUser, setSelectedUser] = useState<UserWithLabel | null>(null);

  useEffect(() => {
    const getAllUsers = async () => {
      const querySnaphot = await getDocs(collection(db, "users"));
      const usersList: UserWithLabel[] = [];
      querySnaphot.forEach((doc) => {
        const resp = doc.data();
        const userData = resp.userData as UserDataDB;
        if (userData.email === currentUserEmail) return;

        usersList.push({ label: userData.email, userData });
      });

      setUsersList(usersList);
    };
    getAllUsers();
  }, []);

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
        options={usersList}
        sx={{ flexGrow: "1" }}
        renderInput={(params) => <TextField {...params} label="Enter email" />}
      ></Autocomplete>
    </div>
  );
};

export default SearchUser;
