import { Outlet } from "react-router-dom";
import Header from "./Header/Header";

const Layout = () => {
  console.log("layout");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
