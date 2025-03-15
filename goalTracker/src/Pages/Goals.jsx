import { useState } from "react";

// LAYOUT
import MainContent from "../components/Layout/MainContent";
import RightPanel from "../components/Layout/RightPanel";
import Modal from "../components/Layout/Modal/Modal";
import { GoalDetailModal } from "../components/Layout/Modal/GoalDetailModal";
// CSS
import classes from "./Goal.module.css";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { getAllTagsThunk } from "../Store/GetTagsSlice";
import { RWD_STATE_ELEMENT } from "../Store/RwdStateSlice";
import { rightPanelModalAction } from "../Store/RightPanelModalSlice";
//REACT
import { useEffect } from "react";
export default function Goals() {
  //get alls database tags by redux thunk and store in redux.The tags will use in Modal component.
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTagsThunk());
  }, []);

  const screenSize = useSelector(
    (state) => state.RwdStateSliceReducer.screenState
  );

  const rightPanelOpen = useSelector(
    (state) => state.RightPanelModalReducer.rightPanelOpen
  );

  function controlrightPanel() {
    dispatch(rightPanelModalAction.controlModal());
  }

  //當rwd到小螢幕被渲染時，讓他一開始是關閉狀態
  useEffect(() => {
    if (screenSize !== RWD_STATE_ELEMENT.SCREEN_SMALL_THAN_576)
      dispatch(rightPanelModalAction.initialModal());
  }, [screenSize]);

  return (
    <div className={classes.container}>
      <MainContent />
      <Modal />
      <GoalDetailModal />
      {screenSize === RWD_STATE_ELEMENT.SCREEN_SMALL_THAN_576 ||
      screenSize === RWD_STATE_ELEMENT.SCREEN_SMALL_THAN_768 ? (
        <div
          className={`${classes.modalOverlay} ${
            !rightPanelOpen && classes.rightPanelNone
          }`}
          onClick={controlrightPanel}
        >
          <RightPanel />
        </div>
      ) : (
        <RightPanel />
      )}
    </div>
  );
}
