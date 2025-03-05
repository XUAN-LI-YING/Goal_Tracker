import { useEffect, useState, useMemo } from "react";
import classes from "./GoalItem.module.css";

//Redux

import {
  dailyGoalsAction,
  getGoalThunk,
  completeGoalThunk,
  deleteGoalThunk
} from "../../Store/GetGoalSlice";
import { useDispatch, useSelector } from "react-redux";
import { goalDetailModalAction } from "../../Store/GoalDetailModalSlice";

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

  //DetailGoalMModal open or not
  const showDetail = useSelector(
    (state) => state.GoalDetailModalReducer.isOpen
  );

  function handleShowDetail(goal) {
    if (showDetail === false) {
      dispatch(goalDetailModalAction.openDetailModal(goal));
    } else {
      dispatch(goalDetailModalAction.closeDetailModal());
    }
  }

  //Remember the goal is check or not
  function handleCompleteChange(id, isComplete) {
    dispatch(
      completeGoalThunk({ year, month, day, id, isComplete: !isComplete })
    );
  }

  //Delete goal
  function handleDelete(id, isComplete) {
    //Delete the goal and update the number of goal completions at the same time

    if (isComplete === true) {
      console.log("123");
      dispatch(
        completeGoalThunk({ year, month, day, id, isComplete: !isComplete })
      );
    }
    dispatch(deleteGoalThunk({ year, month, day, id }));
  }

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
          <div key={goal.id} className={classes.goal}>
            <label className={classes.goalContent}>
              <div>
                <input
                  type="checkbox"
                  checked={goal.isComplete}
                  onChange={() => {
                    handleCompleteChange(goal.id, goal.isComplete);
                  }}
                />
                <div className={classes.checkbox}></div>
                <p>{goal.goalTime}</p>

                <p className={classes.goalText}>{goal.goalText}</p>
              </div>
              <div className={classes.goalTagList}>
                {goal.selectedTags.map((tag) => (
                  <p className={classes.goalTag} key={tag}>
                    {tag !== "無標籤" ? tag : undefined}
                  </p>
                ))}
              </div>
            </label>
            <div className={classes.goalBtn}>
              <button
                type="button"
                onClick={() => {
                  handleShowDetail(goal);
                }}
              >
                詳情
              </button>
              <button
                type="button"
                onClick={() => {
                  handleDelete(goal.id, goal.isComplete);
                }}
              >
                刪除
              </button>
            </div>
          </div>
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
          <div key={goal.id} className={classes.goal}>
            <label className={classes.goalContent}>
              <div>
                <input
                  type="checkbox"
                  checked={goal.isComplete}
                  onChange={() => {
                    handleCompleteChange(goal.id, goal.isComplete);
                  }}
                />
                <div className={classes.checkbox}></div>
                <p>{goal.goalTime}</p>

                <p className={classes.goalText}>{goal.goalText}</p>
              </div>
              <div className={classes.goalTagList}>
                {goal.selectedTags.map((tag) => (
                  <p className={classes.goalTag} key={tag}>
                    {tag !== "無標籤" ? tag : undefined}
                  </p>
                ))}
              </div>
            </label>

            <div className={classes.goalBtn}>
              <button
                type="button"
                onClick={() => {
                  handleShowDetail(goal);
                }}
              >
                詳情
              </button>
              <button
                type="button"
                onClick={() => {
                  handleDelete(goal.id);
                }}
              >
                刪除
              </button>
            </div>
          </div>
        ))}{" "}
      </div>
    </div>
  );
}
