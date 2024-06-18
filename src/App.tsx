import { Outlet } from "react-router-dom";
import { useWindowResize } from "./Hooks/useWindowResize";
import { logout } from "./Services/logout";

function App() {
  useWindowResize();
  return (
    <>
      <button className=" absolute z-50" onClick={logout}>
        logout
      </button>
      <Outlet />
    </>
  );
}

export default App;
