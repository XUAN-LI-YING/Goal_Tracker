import { useEffect, useState, useMemo } from "react";
import classes from "./GoalItem.module.css";

//Redux
import { dailyGoalsAction, getGoalThunk } from "../Store/GetGoalSlice";
import { useDispatch, useSelector } from "react-redux";

export default function GoalItem({ date: { year, month, day } }) {
  const dispatch = useDispatch();
  //display goal of the day
  useEffect(() => {
    dispatch(getGoalThunk({ year, month, day }));
  }, [year, month, day]);

  const allGoals = useSelector((state) => state.DailyGoalsReducer.dailyGoals);

  const { noTimeGoal, sortGoalTime } = useMemo(() => {
    const noTimeGoal = allGoals.filter((goal) => goal.isSetTime === "no");
    const settingTimeGoal = allGoals.filter((goal) => goal.isSetTime === "yes");
    const sortGoalTime = [...settingTimeGoal].sort((goal1, goal2) => {
      const time1 = new Date("1970-01-01 " + goal1.goalTime);
      const time2 = new Date("1970-01-01 " + goal2.goalTime);
      return time1 - time2;
    });

    return { noTimeGoal, sortGoalTime };
  }, [allGoals]);

  useEffect(() => {
    dispatch(dailyGoalsAction.setNoTimeGoal(noTimeGoal));
    dispatch(dailyGoalsAction.setSortGoalTime(sortGoalTime));
  }, [allGoals, dispatch]);

  //Display goal ,according to left tag which you have selected
  const displaySelectedTag = useSelector(
    (state) => state.SelectTagReducer.selectedGoalTag
  );

  const { displayNoTimeGoal, displaySortGoalTime } = useMemo(() => {
    let displayNoTimeGoal = [];
    let displaySortGoalTime = [];

    noTimeGoal.forEach((goal) => {
      const isDisplayGoal = goal.selectedTags.some((tag) =>
        displaySelectedTag.includes(tag)
      );
      if (isDisplayGoal) {
        displayNoTimeGoal = [...displayNoTimeGoal, goal];
      }
    });

    sortGoalTime.forEach((goal) => {
      const isDisplayGoal = goal.selectedTags.some((tag) =>
        displaySelectedTag.includes(tag)
      );
      if (isDisplayGoal) {
        displaySortGoalTime = [...displaySortGoalTime, goal];
      }
    });

    return { displayNoTimeGoal, displaySortGoalTime };
  }, [allGoals, displaySelectedTag]);

  //If there have no any goal,display "no goal "text
  let noTimeGoalEmpty = true;
  let sortGoalTimeEmpty = true;
  if (displayNoTimeGoal.length === 0) {
    noTimeGoalEmpty = true;
  } else {
    noTimeGoalEmpty = false;
  }
  if (displaySortGoalTime.length === 0) {
    sortGoalTimeEmpty = true;
  } else {
    sortGoalTimeEmpty = false;
  }

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

  return (
    <div>
      <p>時間表</p>
      {sortGoalTimeEmpty ? "時標表目前沒有排任何行程" : ""}

      <div className={classes.goalLists}>
        {displaySortGoalTime.map((goal) => (
          <button
            key={goal.id}
            onClick={handleOuterClick}
            className={classes.goal}
          >
            <input type="checkbox" onClick={(e) => e.stopPropagation()} />
            <p>{goal.goalTime}</p>

            <p>{goal.goalText}</p>

            <div className={classes.goalTagList}>
              {goal.selectedTags.map((tag) => (
                <p key={tag}>{tag}</p>
              ))}
            </div>
          </button>
        ))}
      </div>

      <p>其他代辦事項</p>
      {noTimeGoalEmpty ? "目前無其他代辦事項" : ""}
      {displayNoTimeGoal.map((goal) => (
        <button
          key={goal.id}
          onClick={handleOuterClick}
          className={classes.goal}
        >
          <input type="checkbox" onClick={(e) => e.stopPropagation()} />
          <p>{goal.goalTime}</p>

          <p>{goal.goalText}</p>

          <div className={classes.goalTagList}>
            {goal.selectedTags.map((tag) => (
              <p key={tag}>{tag}</p>
            ))}
          </div>
        </button>
      ))}
    </div>
  );
}
