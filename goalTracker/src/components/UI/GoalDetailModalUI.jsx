//Redux
import { useDispatch } from "react-redux";
import { goalDetailModalAction } from "../../Store/GoalDetailModalSlice";

import classes from "./GoalDetailModalUI.module.css";
export default function GoalDetailModalUI({ children }) {
  // openGoalModalState

  const dispatch = useDispatch();

  return (
    <div
      className={classes.modalOverlay}
      onClick={() => dispatch(goalDetailModalAction.closeDetailModal())}
    >
      <div
        className={classes.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={classes.closeButton}
          onClick={() => dispatch(goalDetailModalAction.closeDetailModal())}
        >
          &times;
        </button>

        {children}
      </div>
    </div>
  );
}
