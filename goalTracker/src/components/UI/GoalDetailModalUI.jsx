//Redux
import { useDispatch } from "react-redux";
import { goalDetailModalAction } from "../../Store/GoalDetailModalSlice";
//css and animation
import classes from "./GoalDetailModalUI.module.css";
import { motion } from "framer-motion";

export default function GoalDetailModalUI({ children }) {
  // openGoalModalState

  const dispatch = useDispatch();

  return (
    <motion.div
      className={classes.modalOverlay}
      onClick={() => dispatch(goalDetailModalAction.closeDetailModal())}
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
        <button
          className={classes.closeButton}
          onClick={() => dispatch(goalDetailModalAction.closeDetailModal())}
        >
          &times;
        </button>

        {children}
      </motion.div>
    </motion.div>
  );
}
