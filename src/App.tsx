import { Outlet } from "react-router-dom";
import { useWindowResize } from "./Hooks/useWindowResize";
import { enqueueSnackbar } from "notistack";

function App() {
  useWindowResize();
  const snackTest = () => {
    enqueueSnackbar("Hello", {
      variant: "error",
    });
  };
  return (
    <>
      <Outlet />
      <button
        className="absolute top-0 right-0 z-[9999] text-white"
        onClick={snackTest}
      >
        Test
      </button>
    </>
  );
}

export default App;
