import classes from "./MainContent.module.css";
import { useState, useEffect } from "react";
import { format, addDays } from "date-fns";

//Redux
import { modalAction } from "../Store/ModalSlice";
import { dateAction } from "../Store/DateSlice";
import { useDispatch, useSelector } from "react-redux";
import { MODAL_CONTENT_ELEMENT } from "../Store/ModalSlice";
import { getGoalThunk } from "../Store/GetGoalSlice";

export default function MainContent() {
  const dispatch = useDispatch();

  //Get day to display
  const { year, month, day } = useSelector((state) => state.Date);
  const selectDay = new Date(year, month - 1, day);
  const displayDay = format(selectDay, "	yyyy MMMM dd ");

  //display goal of the day
  useEffect(() => {
    dispatch(getGoalThunk({ year, month, day }));
  }, [year, month, day]);

  const allGoals = useSelector((state) => state.DailyGoalsReducer.dailyGoals);
  const settingTimeGoal = allGoals.filter((goal) => goal.isSetTime === "yes");
  const noTimeGoal = allGoals.filter((goal) => goal.isSetTime === "no");
  const sortGoalTime = settingTimeGoal.sort((goal1, goal2) => {
    const time1 = new Date("1970-01-01 " + goal1.goalTime);

    const time2 = new Date("1970-01-01 " + goal2.goalTime);
    return time1 - time2;
  });

  //DetailGoalMModal
  const [showPopup, setShowPopup] = useState(false);

  const handleOuterClick = (e) => {
    if (showPopup !== true) {
      setShowPopup(true);
    }
  };

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
      <p>時間表</p>

      <div className={classes.goalLists}>
        {sortGoalTime.map((goal) => (
          <button
            key={goal.id}
            onClick={handleOuterClick}
            className={classes.goal}
          >
            <input type="checkbox" onClick={(e) => e.stopPropagation()} />
            <p>{goal.goalTime}</p>

            <p>{goal.goalText}</p>

            <div className={classes.tagList}>
              {goal.selectedTags.map((tag) => (
                <p key={tag}>{tag}</p>
              ))}
            </div>
          </button>
        ))}
      </div>

      <p>其他代辦事項</p>
      {noTimeGoal.map((goal) => (
        <button
          key={goal.id}
          onClick={handleOuterClick}
          className={classes.goal}
        >
          <input type="checkbox" onClick={(e) => e.stopPropagation()} />
          <p>{goal.goalTime}</p>

          <p>{goal.goalText}</p>

          <div className={classes.tagList}>
            {goal.selectedTags.map((tag) => (
              <p key={tag}>{tag}</p>
            ))}
          </div>
        </button>
      ))}

      {showPopup && <button onClick={closePopup}>關閉</button>}
      <button onClick={openModal}>+</button>
    </div>
  );
}
