import SideBar from "../components/Layout/SideBar";
import classes from "./Root.module.css";
import { useEffect } from "react";

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

  // handleResize();
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
      ) : (
        <SideBar />
      )}

      <Outlet />
    </div>
  );
}
