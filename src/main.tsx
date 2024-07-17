// eslint-disable-next-line simple-import-sort/imports
import "./styles/index.css";
import "./styles/reset.css";
import { store } from "./Store/store.ts";

import { ThemeProvider } from "@emotion/react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import { initializeFirebase } from "./firebase-config.ts";
import { CustomSnackbarProvider } from "./Providers/CustomSnackbarProvider.tsx";
import { router } from "./Routes/router.tsx";
import { observeUser } from "./Services/observeUser.ts";
import { theme } from "./styles/MUITheme.ts";

export const { app, db, auth } = initializeFirebase();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CustomSnackbarProvider>
        <RouterProvider router={router} />
      </CustomSnackbarProvider>
    </ThemeProvider>
  </Provider>
);

observeUser();
