import { createBrowserRouter, Navigate } from "react-router-dom";

import { App } from "../App";
import { LogInForm } from "../Components/Auth/LogInForm";
import { RegisterForm } from "../Components/Auth/RegisterForm";
import { AuthPage } from "./AuthPage";
import { ErrorElement } from "./ErrorElement";
import { MainPage } from "./MainPage";
import { ProtectedRoutes } from "./ProtectedRoutes";

export const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorElement />,
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
