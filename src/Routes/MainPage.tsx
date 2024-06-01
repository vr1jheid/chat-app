import ChatsList from "../Components/Chat selection/ChatsList";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import SearchUser from "../Components/Chat selection/SearchUser";
import Chat from "../Components/Chat/Chat";
import { fetchChats } from "../Store/Chats/thunks/fetchChats";
import {
  clearActiveChat,
  selectActiveChatID,
} from "../Store/ActiveChat/activeChat";
import ChatContextContainer from "../Components/Chat/ChatContextContainer";
import { useSubChat } from "../Hooks/useSubChat";
import store from "../Store/store";
/* import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase-config";
import { convertServerTime } from "../utils/convertServerTime"; */

export const loader = async () => {
  console.log("loader");

  const currentUserEmail = store.getState().currentUser.email;
  store.dispatch(fetchChats(currentUserEmail));
  return null;
};

const MainPage = () => {
  console.log("mainpage render");

  const dispatch = useAppDispatch();
  const activeChatID = useAppSelector(selectActiveChatID);
  const containerRef = useRef(null);

  useEffect(() => {
    const clearActiveChatFunc = (e: KeyboardEvent) => {
      if (e.code === "Escape" && activeChatID) {
        dispatch(clearActiveChat());
      }
    };
    window.addEventListener("keydown", clearActiveChatFunc);

    return () => {
      window.removeEventListener("keydown", clearActiveChatFunc);
    };
  }, [activeChatID]);

  useSubChat([]);

  /*   const getSomeMessages = async () => {
    const ref = collection(db, `chats/${activeChatID}/messages`);
    const q = query(ref, orderBy("serverTime", "desc"), limit(5));
    const querySnapshot = await getDocs(q);
    const arr: any[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const serverTime = data.serverTime;
      arr.push(data);
            const serverTimeCopy = { ...serverTime };
      console.log(serverTimeCopy);
    });

    console.log(arr[3]);

    const q2 = query(
      ref,
      where("serverTime", "<", convertServerTime(arr[3].serverTime)),
      orderBy("serverTime", "desc"),
      limit(5)
    );
    const querySnapshot2 = await getDocs(q2);
    querySnapshot2.forEach((doc) => {
      const data = doc.data();
      console.log(data);
    });
  };
 */
  return (
    <div ref={containerRef} className="grow max-h-screen flex pt-[82px]">
      {
        <button
          onClick={() => {
            console.log(window.innerWidth, window.innerHeight);
          }}
          className=" absolute z-50 left-0 bottom-0 size-10 bg-white"
        >
          test
        </button>
      }
      <div className="min-w-[25%] w-[25%] p-3 flex flex-col gap-5 bg-gray-light border-r-2 border-solid  border-gray-very-light ">
        <SearchUser />
        <ChatsList />
      </div>
      <div className={`bg-gray-dark grow max-h-full bg-cats-svg`}>
        {activeChatID && (
          <ChatContextContainer>
            <Chat />
          </ChatContextContainer>
        )}
      </div>
    </div>
  );
};

export default MainPage;
