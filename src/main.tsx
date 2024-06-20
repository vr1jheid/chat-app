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
import { SnackbarProvider } from "notistack";

export const { app, db, auth } = initializeFirebase();
observeUser();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        dense
        maxSnack={5}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <RouterProvider router={router} />
      </SnackbarProvider>
    </ThemeProvider>
  </Provider>
);
