//Redux
import { useDispatch } from "react-redux";
import { goalDetailModalAction } from "../../Store/GoalDetailModalSlice";
//css and animation
import classes from "./GoalDetailModalUI.module.css";
import { motion } from "framer-motion";

export default function GoalDetailModalUI({ children }) {
  // close GoalModalState
  const dispatch = useDispatch();
  function handleCloseModal() {
    //session
    sessionStorage.removeItem("editGoalForm");
    sessionStorage.removeItem("editGoalFormTag");
    //
    dispatch(goalDetailModalAction.initialAllState());
  }

  return (
    <motion.div
      className={classes.modalOverlay}
      onClick={handleCloseModal}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={classes.modalContent}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <button className={classes.closeButton} onClick={handleCloseModal}>
          &times;
        </button>

        {children}
      </motion.div>
    </motion.div>
  );
}
