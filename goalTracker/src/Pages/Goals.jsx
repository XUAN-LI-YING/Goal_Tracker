import { useState } from "react";

// LAYOUT
import MainContent from "../components/Layout/MainContent";
import RightPanel from "../components/Layout/RightPanel";
import Modal from "../components/Layout/Modal/Modal";
import { GoalDetailModal } from "../components/Layout/Modal/GoalDetailModal";
// CSS
import classes from "./Goal.module.css";
// REDUX
import { useDispatch } from "react-redux";
import { getAllTagsThunk } from "../Store/GetTagsSlice";
//REACT
import { useEffect } from "react";
export default function Goals() {
  //get alls database tags by redux thunk and store in redux.The tags will use in Modal component.
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTagsThunk());
  }, []);

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
      <MainContent />
      <Modal />
      <GoalDetailModal />
      {openSide && <RightPanel />}
    </div>
  );
}
