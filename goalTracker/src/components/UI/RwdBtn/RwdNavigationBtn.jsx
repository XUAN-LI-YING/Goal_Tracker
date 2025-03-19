import { Fragment } from "react";
import classes from "../RwdBtn/RwdNavigationBtn.module.css";
//Redux
import { sideBarModalAction } from "../../../Store/SideBarModalSlice";
import { rightPanelModalAction } from "../../../Store/RightPanelModalSlice";
import { useDispatch, useSelector } from "react-redux";
//Img
import hambugerIcon from "../../../assets/hambuger_black.png";
import calendarIcon from "../../../assets/calendar.png";
//React router
import { useLocation } from "react-router-dom";

export default function RwdNavigationBtn() {
  const dispatch = useDispatch();
  //rwd open or close sideBar
  function handleSideBar() {
    dispatch(sideBarModalAction.controlModal());
  }

  //rwd open or close rightPanel
  function handlerightPanel() {
    dispatch(rightPanelModalAction.controlModal());
  }

  //根據當前頁面決定哪些btn該顯示
  const location = useLocation();
  //if log in
  const accountNum = useSelector((state) => state.LoginReducer.accountNum);

  return (
    <div className={classes.btnSection}>
      <button className={classes.hambugerIcon} onClick={handleSideBar}>
        <img src={hambugerIcon} />
      </button>
      {accountNum && (
        <button
          className={
            location.pathname === "/"
              ? classes.calendarIcon
              : classes.calendarIconNone
          }
          onClick={handlerightPanel}
        >
          <img src={calendarIcon} />
        </button>
      )}
    </div>
  );
}
