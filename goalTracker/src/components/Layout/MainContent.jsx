import classes from "./MainContent.module.css";
import { useState } from "react";

//Redux
import { ModalAction } from "../Store/ModalSlice";
import { useDispatch } from "react-redux";
import { MODAL_CONTENT_ELEMENT } from "../Store/ModalSlice";

export default function MainContent() {
  //DetailGoalMModal
  const [showPopup, setShowPopup] = useState(false);

  const handleOuterClick = (e) => {
    // if (e.target.tagName !== "INPUT") {
    if (showPopup !== true) {
      setShowPopup(true);
    }

    // }
  };
  console.log("rerender");
  const closePopup = () => {
    setShowPopup(false);
  };

  // AddGoalModal Redux
  const dispatch = useDispatch();
  function openModal() {
    dispatch(ModalAction.openModal());
    dispatch(ModalAction.displayElement(MODAL_CONTENT_ELEMENT.ADD_GOAL));
  }
  return (
    <div className={classes.mainContent}>
      <select>
        <option value="Daily">Daily</option>
        <option value="Weekly">Weekly</option>
        <option value="Monthly">Monthly</option>
        <option value="Annual">Annual</option>
      </select>

      <h1>Daily Goals</h1>
      <div>
        <h2>2025 08 March</h2>
        <button>&lt;</button>
        <button>&gt;</button>
      </div>

      <div className={classes.goalLists}>
        {/* MAP */}
        <button onClick={handleOuterClick} className={classes.goal}>
          <input type="checkbox" onClick={(e) => e.stopPropagation()} />
          <p>這是一串文字</p>
          <div>
            <p>區塊 1 文字</p>
          </div>
          <div>
            <p>區塊 2 文字</p>
          </div>
        </button>

        {showPopup && <button onClick={closePopup}>關閉</button>}
        <button onClick={openModal}>+</button>
      </div>
    </div>
  );
}
