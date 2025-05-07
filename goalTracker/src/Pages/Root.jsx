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

    const screenWidth = document.documentElement.clientWidth;

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

  //當rwd到2大螢幕的時候就關閉漢堡icon點開的sideBar modal
  useEffect(() => {
    if (screenState !== RWD_STATE_ELEMENT.SCREEN_SMALL_THAN_576)
      dispatch(sideBarModalAction.initialModal());
  }, [screenState]);

  //
  //因應不同瀏覽器視窗可能會有工具列擋住網站，因此將扣除工具列得到實際高度
  useEffect(() => {
    const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

    const setRealVH = () => {
      //在某些 Android 瀏覽器，視窗高度可能是浮動的（尤其打開鍵盤後）
      const vh = window.innerHeight * 0.01;

      // 在手機上使用自訂計算的 vh
      if (isMobile) {
        document.documentElement.style.setProperty("--vh", `${vh}px`);
      } else {
        // 桌機上回退為標準 vh（避免多出 scrollbar）
        document.documentElement.style.setProperty("--vh", `1vh`);
      }
    };

    setRealVH();
    window.addEventListener("resize", setRealVH);
    // 轉向橫向仍然可以監聽到高度變化
    window.addEventListener("orientationchange", setRealVH);

    return () => {
      window.removeEventListener("resize", setRealVH);
      window.removeEventListener("orientationchange", setRealVH);
    };
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
