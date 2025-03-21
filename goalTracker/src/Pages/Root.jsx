import SideBar from "../components/Layout/SideBar";
import classes from "./Root.module.css";
import { useEffect } from "react";
import Login from "./LogIn";
import RwdNavigationBtn from "../components/UI/RwdBtn/RwdNavigationBtn";

import { Fragment } from "react";
//React router
import { Outlet } from "react-router-dom";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { rwdStateSliceAction } from "../Store/RwdStateSlice";
import { RWD_STATE_ELEMENT } from "../Store/RwdStateSlice";
import { sideBarModalAction } from "../Store/SideBarModalSlice";

export default function Root() {
  const { year, month, day } = useSelector((state) => state.Date);

  //if Logout ，render login page
  const accountNum = useSelector((state) => state.LoginReducer.accountNum);

  //rwd sideBar state
  const sideBarOpen = useSelector(
    (state) => state.SideBarModalReducer.sideBarOpen
  );

  const screenState = useSelector(
    (state) => state.RwdStateSliceReducer.screenState
  );

  // 監聽視窗大小變化
  const dispatch = useDispatch();

  const handleResize = () => {
    let screenSize;
    console.log(" window.innerWidth", window.innerWidth);

    const screenWidth = document.documentElement.clientWidth;
    console.log(" screenWidth", screenWidth);
    switch (true) {
      case screenWidth <= 576:
        screenSize = RWD_STATE_ELEMENT.SCREEN_SMALL_THAN_576;
        break;
      case screenWidth <= 768:
        screenSize = RWD_STATE_ELEMENT.SCREEN_SMALL_THAN_768;
        break;
      case screenWidth < 1200:
        screenSize = RWD_STATE_ELEMENT.SCREEN_SMALL_1200;
        break;
      default:
        screenSize = RWD_STATE_ELEMENT.SCREEN_BIG_THAN_1200;
    }

    dispatch(rwdStateSliceAction.currentScreen(screenSize));
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function controlSideBar() {
    dispatch(sideBarModalAction.controlModal());
  }

  //當rwd到小螢幕被渲染時，讓他一開始是關閉狀態
  useEffect(() => {
    if (screenState !== RWD_STATE_ELEMENT.SCREEN_SMALL_THAN_576)
      dispatch(sideBarModalAction.initialModal());
  }, [screenState]);

  //
  //因應不同瀏覽器視窗可能會有工具列擋住網站，因此將扣除工具列得到實際高度
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    // 初始執行一次
    setVH();

    // 每當視窗大小改變時執行
    window.addEventListener("resize", setVH);

    // 清理事件監聽，避免記憶體洩漏
    return () => window.removeEventListener("resize", setVH);
  }, []);

  return (
    <div className={classes.container}>
      {screenState === RWD_STATE_ELEMENT.SCREEN_SMALL_THAN_576 ? (
        <Fragment>
          <RwdNavigationBtn />
          <div
            className={`${classes.modalOverlay} ${
              !sideBarOpen && classes.leftSidebarNone
            }`}
            onClick={controlSideBar}
          >
            <SideBar />
          </div>
        </Fragment>
      ) : screenState === RWD_STATE_ELEMENT.SCREEN_SMALL_THAN_768 ? (
        <Fragment>
          <RwdNavigationBtn />
          <SideBar />
        </Fragment>
      ) : (
        <SideBar />
      )}
      {!accountNum ? <Login /> : <Outlet />}
    </div>
  );
}
