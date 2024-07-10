import { Navigate, createBrowserRouter } from "react-router-dom";
import { AuthPage } from "./AuthPage";
import { LogInForm } from "../Components/Auth/LogInForm";
import { RegisterForm } from "../Components/Auth/RegisterForm";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { MainPage } from "./MainPage";
import { App } from "../App";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: <AuthPage />,
        children: [
          {
            index: true,
            path: "login",
            element: <LogInForm />,
          },
          {
            path: "register",
            element: <RegisterForm />,
          },
        ],
      },
      {
        element: <ProtectedRoutes />,
        children: [
          {
            path: "/",
            element: <MainPage />,
          },
        ],
      },
      {
        path: "*",
        element: <Navigate to={"/"} />,
      },
    ],
  },
]);
