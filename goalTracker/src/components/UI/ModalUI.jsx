//Redux
import { useDispatch } from "react-redux";
import { modalAction } from "../Store/ModalSlice";

import classes from "./ModalUI.module.css";
export default function Modal({ children }) {
  // openGoalModalState

  const dispatch = useDispatch();

  return (
    <div
      className={classes.modalOverlay}
      onClick={() => dispatch(modalAction.closeModal())}
    >
      <div
        className={classes.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={classes.closeButton}
          onClick={() => dispatch(modalAction.closeModal())}
        >
          &times;
        </button>

        {children}
      </div>
    </div>
  );
}
