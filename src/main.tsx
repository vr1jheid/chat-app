import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./Store/store.ts";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/router.tsx";
import { initializeFirebase } from "./firebase-config.ts";
import { observeUser } from "./Services/observeUser.ts";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./styles/MUITheme.ts";
import { SnackbarProvider } from "notistack";
import { MessageNotification } from "./Components/Chat/MessageNotification.tsx";
import "./styles/index.css";
import "./styles/reset.css";

export const { app, db, auth } = initializeFirebase();
observeUser();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        dense
        maxSnack={window.innerWidth > 1024 ? 3 : 1}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        Components={{ messageNotification: MessageNotification }}
      >
        <RouterProvider router={router} />
      </SnackbarProvider>
    </ThemeProvider>
  </Provider>
);
