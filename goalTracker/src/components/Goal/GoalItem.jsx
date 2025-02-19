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

            <div className={classes.goalTagList}>
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
