import { Fragment } from "react";
import SideBar from "../components/Layout/SideBar";
import { Outlet } from "react-router-dom";
import classes from "./Root.module.css";

//redux
import { ModalStore } from "../components/Store/ModalSlice";
import { Provider } from "react-redux";

export default function Root() {
  return (
    <div className={classes.container}>
      <Provider store={ModalStore}>
        <SideBar />
      </Provider>
      <Outlet />
    </div>
  );
}
