import { Outlet } from "react-router-dom";
import { useWindowResize } from "./Hooks/useWindowResize";

function App() {
  useWindowResize();

  return (
    <>
      <Outlet />
      <button
        onClick={() => {}}
        className="absolute z-50 bg-white p-5 top-0 right-0"
      >
        TEST
      </button>
    </>
  );
}

export default App;
