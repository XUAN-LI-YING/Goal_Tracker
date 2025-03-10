import classes from "./Personal.module.css";
import userSticker from "../assets/userSticker.png";
//
import { useState, useEffect } from "react";
//react router
import { useLoaderData } from "react-router-dom";
("use client");
//motion
import { motion, useAnimation } from "framer-motion";

export default function Personal() {
  const { yearCompleteNum, monthCompleteNum, dayCompleteNum } = useLoaderData();

  const controls = useAnimation();
  const [number, setNumber] = useState(1);

  useEffect(() => {
    controls.start({
      value: dayCompleteNum,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    });
  }, [controls]);
  return (
    <div className={classes.userSection}>
      <div className={classes.userName}>
        <img src={userSticker} className={classes.userSticker} />
        <p>使用者名稱</p>
      </div>
      <div className={classes.userGoalData}>
        <label>
          今日已達成
          <div>
            <motion.span
              animate={controls}
              initial={{ value: 1 }}
              onUpdate={(latest) => {
                setNumber(Math.floor(Math.random() * 10) + 1);
              }}
              onAnimationComplete={() => setNumber(dayCompleteNum)}
            >
              {number}
              {/* {dayCompleteNum} */}
            </motion.span>
            個目標
          </div>
        </label>
        <label>
          這個月已達成
          <div>
            <span>{monthCompleteNum}</span>個目標
          </div>
        </label>
        <label>
          今年已達成
          <div>
            <span>{yearCompleteNum}</span>個目標
          </div>
        </label>
      </div>
    </div>
  );
}
