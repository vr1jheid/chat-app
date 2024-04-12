import { Autocomplete, TextField } from "@mui/material";

import React, { useEffect, useState } from "react";
import { UserDataDB } from "../utils/createUserData";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import SearchUser from "./SearchUser";

export interface UserWithLabel {
  label: string | null;
  userData: UserDataDB;
}

const ChatsList = () => {
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
