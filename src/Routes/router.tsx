import { Navigate, createBrowserRouter } from "react-router-dom";
import { LogInForm } from "../Components/Auth/LogInForm";
import { RegisterForm } from "../Components/Auth/RegisterForm";
import { App } from "../App";
import { AuthPage } from "./AuthPage";
import { MainPage } from "./MainPage";
import { ProtectedRoutes } from "./ProtectedRoutes";

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
