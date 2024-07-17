import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../../../main";
import { UserDataDB } from "../../../Types/userTypes";
import { RootState } from "../../store";

const fetchAllUsersEmailsFromDB = createAsyncThunk(
  "allUsersList/fetchUsers",
  async (_, thunkAPI) => {
    const querySnaphot = await getDocs(collection(db, "users"));
    const usersEmailsList: string[] = [];
    querySnaphot.forEach((doc) => {
      const resp = doc.data();
      const userData = resp.userData as UserDataDB;
      usersEmailsList.push(userData.email);
    });
    const { currentUser } = thunkAPI.getState() as RootState;

    return usersEmailsList.filter((u) => u !== currentUser.email);
  }
);

export default fetchAllUsersEmailsFromDB;
