//Redux
import { useDispatch } from "react-redux";
import { modalAction } from "../../Store/ModalSlice";

//css and animation
import classes from "./ModalUI.module.css";
import { motion } from "framer-motion";

export default function Modal({ children }) {
  // openGoalModalState
  const dispatch = useDispatch();

  function handleCloseModal() {
    //session
    sessionStorage.removeItem("addGoalForm");
    sessionStorage.removeItem("addGoalFormTag");
    //
    dispatch(modalAction.closeModal());
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
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
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
