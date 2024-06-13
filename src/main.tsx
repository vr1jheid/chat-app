import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./Store/store.ts";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/router.tsx";
import { initializeFirebase } from "./firebase-config.ts";
import { observeUser } from "./Services/observeUser.ts";
import "./styles/index.css";
import "./styles/reset.css";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./styles/MUITheme.ts";

export const { app, db, auth } = initializeFirebase();
observeUser();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </ThemeProvider>
);
