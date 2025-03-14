import { useEffect, useState, useMemo } from "react";
import classes from "./GoalItem.module.css";
import GoalItem from "./GoalItem";
//Redux
import { dailyGoalsAction, getGoalThunk } from "../../Store/GetGoalSlice";
import { useDispatch, useSelector } from "react-redux";

export default function GoalList({ date: { year, month, day } }) {
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
  console.log("noTimeGoal", noTimeGoal);
  console.log("sortGoalTime", sortGoalTime);
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
  console.log("displayNoTimeGoal", displayNoTimeGoal);
  console.log("displaySortGoalTime ", displaySortGoalTime);

  return (
    <div className={classes.allGoals}>
      <div className={classes.line}></div>
      <p>今日行程</p>
      {displaySortGoalTime.length === 0 ? (
        <p className={classes.noTask}>目前沒有排任何行程</p>
      ) : (
        ""
      )}

      <div className={classes.goalLists}>
        {displaySortGoalTime.map((goal) => (
          <GoalItem goal={goal} key={goal.id} />
        ))}
      </div>

      <div className={classes.line}></div>
      <p>其他代辦事項</p>
      {displayNoTimeGoal.length === 0 ? (
        <p className={classes.noTask}>目前無其他代辦事項</p>
      ) : (
        ""
      )}
      <div className={classes.goalLists}>
        {displayNoTimeGoal.map((goal) => (
          <GoalItem goal={goal} key={goal.id} />
        ))}
      </div>
    </div>
  );
}
