import classes from "./GoalItem.module.css";
import { motion } from "framer-motion";
//Redux
import { completeGoalThunk, deleteGoalThunk } from "../../Store/GetGoalSlice";
import { useDispatch, useSelector } from "react-redux";
import { goalDetailModalAction } from "../../Store/GoalDetailModalSlice";

export default function GoalItem({ goal }) {
  const dispatch = useDispatch();

  //Get day to display
  const { year, month, day } = useSelector((state) => state.Date);

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
      dispatch(
        completeGoalThunk({ year, month, day, id, isComplete: !isComplete })
      );
    }
    dispatch(deleteGoalThunk({ year, month, day, id }));
  }

  return (
    <motion.div
      key={goal.id}
      className={classes.goal}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <label className={classes.goalContent}>
        <div>
          <div>
            <input
              type="checkbox"
              checked={goal.isComplete}
              onChange={() => {
                handleCompleteChange(goal.id, goal.isComplete);
              }}
            />
            <div className={classes.checkbox}></div>
          </div>
          <div>
            <p>{goal.goalTime}</p>
            <p className={classes.goalText}>{goal.goalText}</p>
          </div>
          {/* rwd max-width: 450px*/}
          <div>
            <div>
              <p>{goal.goalTime}</p>
              <p className={classes.goalText}>{goal.goalText}</p>
            </div>
            <div className={classes.goalTagList}>
              {goal.selectedTags.map((tag) => (
                <p
                  className={
                    tag === "無標籤" ? classes.goalTagNone : classes.goalTag
                  }
                  key={tag}
                >
                  {tag}
                </p>
              ))}
            </div>
          </div>
          {/* rwd max-width: 450px*/}
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
    </motion.div>
  );
}
