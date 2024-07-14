import { SnackbarProvider } from "notistack";
import { ReactNode } from "react";
import { MessageNotification } from "../Components/Chat/MessageNotification";

interface Props {
  children: ReactNode;
}

export const CustomSnackbarProvider = ({ children }: Props) => {
  return (
    <SnackbarProvider
      dense
      maxSnack={window.innerWidth > 1024 ? 3 : 1}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      Components={{ messageNotification: MessageNotification }}
    >
      {children}
    </SnackbarProvider>
  );
};
