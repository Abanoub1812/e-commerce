import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";


function Layout() {
  return (
    <>
      <Navbar />  {/* Ensure Navbar is included here */}
      <Outlet />  {/* This renders the child route components */}
    </>
  );
}

export default Layout;
