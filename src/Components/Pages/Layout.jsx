import { Outlet, Link } from "react-router";
import NavBar from "../Organisms/NavBar";

const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default Layout;
