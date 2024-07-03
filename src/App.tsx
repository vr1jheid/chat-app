import { Outlet } from "react-router-dom";
import { useWindowResize } from "./Hooks/useWindowResize";
import { getUnseenMessagesCount } from "./Store/Chats/thunks/fetchChats";
import {
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "./main";

function App() {
  useWindowResize();

  const testFunc = async () => {
    const docsnap = await getDoc(
      doc(db, "chats/mainChat/messages/0PnqBl5VyW3kXbmoJgrW")
    );
    const timestamp = docsnap.data().serverTime as Timestamp;
    /*
    console.log(timestamp.toMillis());
    console.log(timestamp.valueOf()); */

    const ref = collection(db, `chats/mainChat/messages`);
    const querySnapshot = await getDocs(
      query(ref, where("serverTime", "<", Timestamp.now()))
    );

    console.log(querySnapshot.size);
  };

  return (
    <>
      <Outlet />
      <button
        onClick={() => {
          testFunc();
        }}
        className="absolute z-50 bg-white p-5 top-0 right-0"
      >
        TEST
      </button>
    </>
  );
}

export default App;
