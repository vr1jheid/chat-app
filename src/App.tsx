import { Outlet } from "react-router-dom";
import { useWindowResize } from "./Hooks/useWindowResize";
import store from "./Store/store";

function App() {
  useWindowResize();
  return (
    <>
      <Outlet />
      <button
        onClick={() => {
          console.log(store.getState());
        }}
        className="absolute z-50 bg-white p-5 top-0 right-0"
      >
        TEST
      </button>
    </>
  );
}

export default App;
