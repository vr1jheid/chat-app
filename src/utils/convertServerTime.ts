import { Timestamp as TimestampDB } from "firebase/firestore";
import { Timestamp } from "../Types/messageTypes";

export const convertServerTime = (
  serverTime: TimestampDB
): Timestamp | null => {
  if (!serverTime || !serverTime.seconds || !serverTime.nanoseconds) {
    return null;
  }
  return {
    seconds: serverTime.seconds,
    nanoseconds: serverTime.nanoseconds,
  };
};
