import { Fragment } from "react";
import SideBar from "../components/Layout/SideBar";
import { Outlet } from "react-router-dom";
import classes from "./Root.module.css";

export default function Root() {
  return (
    <div className={classes.container}>
      <SideBar />
      <Outlet />
    </div>
  );
}
