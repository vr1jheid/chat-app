import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./Store/store.ts";
import "./index.css";
import "./reset.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/router.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
