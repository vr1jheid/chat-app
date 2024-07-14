import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./Store/store.ts";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/router.tsx";
import { initializeFirebase } from "./firebase-config.ts";
import { observeUser } from "./Services/observeUser.ts";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./styles/MUITheme.ts";
import "./styles/index.css";
import "./styles/reset.css";
import { CustomSnackbarProvider } from "./Providers/CustomSnackbarProvider.tsx";

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
