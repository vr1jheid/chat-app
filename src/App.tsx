import { Outlet } from "react-router-dom";
import { useWindowResize } from "./Hooks/useWindowResize";

function App() {
  useWindowResize();
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
