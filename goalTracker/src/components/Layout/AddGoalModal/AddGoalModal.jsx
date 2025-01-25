//Redux
import { useSelector, useDispatch } from "react-redux";
import { addGoalModalAction } from "./Store/AddGoalModalSlice";

import classes from "./AddGoalModal.module.css";
export default function AddGoalModal() {
  const isOpen = useSelector((state) => state.addGoalModal.isOpen);
  const dispatch = useDispatch();

  if (!isOpen) return null;

  return (
    <div
      className={classes.modalOverlay}
      onClick={() => dispatch(addGoalModalAction.closeModal())}
    >
      <div
        className={classes.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={classes.closeButton}
          onClick={() => dispatch(addGoalModalAction.closeModal())}
        >
          &times;
        </button>
      </div>
    </div>
  );
}
