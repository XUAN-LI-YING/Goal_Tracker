import { Fragment } from "react";
import classes from "../RwdBtn/RwdNavigationBtn.module.css";
//Redux
import { sideBarModalAction } from "../../../Store/SideBarModalSlice";
import { rightPanelModalAction } from "../../../Store/RightPanelModalSlice";
import { useDispatch } from "react-redux";
//Img
import hambugerIcon from "../../../assets/hambuger_black.png";
import calendarIcon from "../../../assets/calendar.png";

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

  return (
    <div className={classes.btnSection}>
      <button className={classes.hambugerIcon} onClick={handleSideBar}>
        <img src={hambugerIcon} />
      </button>
      <button className={classes.calendarIcon} onClick={handlerightPanel}>
        <img src={calendarIcon} />
      </button>
    </div>
  );
}
