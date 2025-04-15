import classes from "./MainContent.module.css";
import { useState } from "react";
import { format, addDays } from "date-fns";

import GoalList from "../Goal/GoalList";
//Redux
import { modalAction } from "../../Store/ModalSlice";
import { dateAction } from "../../Store/DateSlice";
import { useDispatch, useSelector } from "react-redux";
import { MODAL_CONTENT_ELEMENT } from "../../Store/ModalSlice";

//img
import prevIcon from "../../assets/prevPage.png";
import nextIcon from "../../assets/nextPage.png";
import addIcon from "../../assets/add.png";

//Framer motion
import { motion, AnimatePresence } from "framer-motion";

export default function MainContent() {
  const dispatch = useDispatch();

  //Get day to display
  const { year, month, day } = useSelector((state) => state.Date);

  const selectDay = new Date(year, month - 1, day);
  const displayDay = format(selectDay, "	yyyy年MM月dd日 ");

  // AddGoalModal Redux

  function openModal() {
    dispatch(modalAction.openModal());
    dispatch(modalAction.displayElement(MODAL_CONTENT_ELEMENT.ADD_GOAL));
  }

  // Go pre or next day
  function goPreDay() {
    const previousDay = addDays(selectDay, -1);
    upDateDay(previousDay);
  }

  function goNextDay() {
    const nextDay = addDays(selectDay, +1);
    upDateDay(nextDay);
  }

  function upDateDay(newDay) {
    dispatch(dateAction.switchYear(newDay.getFullYear()));
    dispatch(dateAction.switchMonth(newDay.getMonth() + 1));
    dispatch(dateAction.switchDay(newDay.getDate()));
  }

  return (
    <div className={classes.mainContent}>
      {/* <select>
        <option value="Daily">Daily</option>
        <option value="Weekly">Weekly</option>
        <option value="Monthly">Monthly</option>
        <option value="Annual">Annual</option>
      </select> */}

      <h1>每日目標</h1>
      <div className={classes.date}>
        <AnimatePresence mode="wait">
          <motion.h2
            key={displayDay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            // exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {displayDay}
          </motion.h2>
        </AnimatePresence>
        <button className={classes.goOneDay} onClick={goPreDay}>
          <img src={prevIcon} alt="Go to prev day." />
        </button>
        <button className={classes.goOneDay} onClick={goNextDay}>
          <img src={nextIcon} alt="Go to next day." />
        </button>
      </div>
      <div className={classes.line}></div>
      <AnimatePresence mode="wait">
        <motion.div
          className={classes.goalItem}
          key={displayDay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          // exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <GoalList date={{ year, month, day }} />
        </motion.div>
      </AnimatePresence>
      <button className={classes.addGoalBtn} onClick={openModal}>
        <img src={addIcon} />
      </button>
    </div>
  );
}
