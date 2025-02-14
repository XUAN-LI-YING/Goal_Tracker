import classes from "./MainContent.module.css";
import { useState } from "react";
import { format, addDays } from "date-fns";

//Redux
import { modalAction } from "../Store/ModalSlice";
import { dateAction } from "../Store/DateSlice";
import { useDispatch, useSelector } from "react-redux";
import { MODAL_CONTENT_ELEMENT } from "../Store/ModalSlice";

export default function MainContent() {
  const dispatch = useDispatch();

  //Get day to display
  const { year, month, day } = useSelector((state) => state.Date);
  const selectDay = new Date(year, month - 1, day);
  const displayDay = format(selectDay, "	yyyy MMMM dd ");

  //DetailGoalMModal
  const [showPopup, setShowPopup] = useState(false);

  const handleOuterClick = (e) => {
    // if (e.target.tagName !== "INPUT")
    if (showPopup !== true) {
      setShowPopup(true);
    }
  };
  console.log("rerender");
  const closePopup = () => {
    setShowPopup(false);
  };

  // AddGoalModal Redux

  function openModal() {
    dispatch(modalAction.openModal());
    dispatch(modalAction.displayElement(MODAL_CONTENT_ELEMENT.ADD_GOAL));
  }

  // Go pre or next day
  function goPreDay() {
    const previousDay = addDays(selectDay, -1);
    upDateDay(previousDay);
  }

  function goNextDay() {
    const nextDay = addDays(selectDay, +1);
    upDateDay(nextDay);
  }

  function upDateDay(newDay) {
    dispatch(dateAction.switchYear(newDay.getFullYear()));
    dispatch(dateAction.switchMonth(newDay.getMonth() + 1));
    dispatch(dateAction.switchDay(newDay.getDate()));
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
        <h2>{displayDay}</h2>
        <button onClick={goPreDay}>&lt;</button>
        <button onClick={goNextDay}>&gt;</button>
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
