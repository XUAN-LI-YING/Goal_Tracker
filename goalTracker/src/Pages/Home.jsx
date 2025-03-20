import { useRef } from "react";
//image
import coverImg from "../assets/cover.webp";
import coverImg_straight from "../assets/cover_straight.webp";

import IntroductionImg1 from "../assets/Introduction1.png";
import IntroductionImg2 from "../assets/Introduction2.png";
import IntroductionImg3 from "../assets/Introduction3.png";

//css、motion
import classes from "./Home.module.css";
import { motion } from "framer-motion";

//Router
import { NavLink } from "react-router-dom";

export default function Home() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  return (
    <motion.div
      className={classes.homeContent}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileInView="visible"
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className={classes.homeBar}>
        <p>GoalTracker</p>
      </div>

      <div className={classes.homeImg}>
        <img className={classes.coverImg} src={coverImg} />
        <img className={classes.coverImgStraight} src={coverImg_straight} />
      </div>
      <motion.div
        className={classes.startBtn}
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
      >
        <NavLink to="/">
          <button>開始設定目標</button>
        </NavLink>
      </motion.div>
      <div className={classes.introSection}>
        <motion.p
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          className={classes.slogon}
        >
          「告別拖延！標籤分類 × 時間規劃，助你聚焦真正重要的事！」
        </motion.p>
        <div className={classes.introduction1}>
          <motion.img
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            src={IntroductionImg1}
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
          >
            <p>GoalTracker可以幫助您設定每日目標</p>
          </motion.div>
        </div>
        <div className={classes.introduction2}>
          <motion.img
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            src={IntroductionImg2}
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
          >
            <p>您可以新增各種標籤為您的目標分類</p>
            <p variants={fadeInUp}>以及選擇是否要為目標設定時間</p>
          </motion.div>
        </div>
        <div className={classes.introduction3}>
          <motion.img
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            src={IntroductionImg3}
          />
          <div>
            <motion.p
              initial="hidden"
              whileInView="visible"
              variants={fadeInUp}
            >
              您還能藉由勾選標籤顯示擁有該標籤的目標
            </motion.p>
          </div>
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          className={classes.flootSlogon}
        >
          <p>「開始設定目標，讓每一天都踏實的前進！」😊</p>
          <div className={classes.startBtn}>
            <NavLink to="/">
              <button>開始設定目標</button>
            </NavLink>
          </div>
        </motion.div>

        <div className={classes.Footer}></div>
      </div>
    </motion.div>
  );
}
