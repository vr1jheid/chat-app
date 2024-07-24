import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { ModalManager } from "./Components/Modal/ModalManager/ModalManager";
import { useWindowResize } from "./Hooks/useWindowResize";
import { cacheChatsToLS } from "./utils/cacheChatsToLS";

export const App = () => {
  useWindowResize();

  useEffect(() => {
    window.addEventListener("unload", cacheChatsToLS);
  }, []);

  return (
    <>
      <Outlet />
      <ModalManager />

      {/*       <button
        onClick={showNoti}
        className="absolute z-50 bg-white p-5 top-0 right-0"
      >
        TEST
      </button> */}
    </>
  );
};
