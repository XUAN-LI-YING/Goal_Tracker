import SideBar from "../components/Layout/SideBar";
import classes from "./Root.module.css";
import { useState, useEffect } from "react";
//React router
import { Outlet } from "react-router-dom";

export default function Root() {
  // 監聽視窗大小變化
  const [openSide, setOpenSide] = useState(window.innerWidth > 576);

  const handleResize = () => {
    setOpenSide(window.innerWidth > 576);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={classes.container}>
      {openSide && <SideBar />}

      <Outlet />
    </div>
  );
}
