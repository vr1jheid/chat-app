import { Autocomplete, TextField } from "@mui/material";

import React, { useEffect, useState } from "react";
import { UserDataDB } from "../utils/createUserData";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import SearchUser from "./SearchUser";
import { useAppSelector } from "../redux/hooks";
import { selectUserEmail } from "../redux/slices/currentUser";

export interface UserWithLabel {
  label: string | null;
  userData: UserDataDB;
}

const ChatsList = () => {
  const currentUserEmail = useAppSelector(selectUserEmail);
  const [allUsersWithLabel, setAllUsersWithLabel] = useState<UserWithLabel[]>(
    []
  );
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

      setAllUsersWithLabel(usersList);
    };
    getAllUsers();
  }, []);

  return (
    <div className="w-[35%] p-3">
      <SearchUser options={allUsersWithLabel} />
      <section></section>
    </div>
  );
};

export default ChatsList;
