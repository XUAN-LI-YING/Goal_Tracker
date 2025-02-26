import SideBar from "../components/Layout/SideBar";
import classes from "./Root.module.css";
//React router
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div className={classes.container}>
      <SideBar />

      <Outlet />
    </div>
  );
}
