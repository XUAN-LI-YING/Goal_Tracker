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
import HomeFadeMotion from "../components/UI/HomeFadeMotion.jsx";
//Router
import { NavLink } from "react-router-dom";

export default function Home() {
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
      <HomeFadeMotion as="div" className={classes.startBtn}>
        <NavLink to="/">
          <button>開始設定目標</button>
        </NavLink>
      </HomeFadeMotion>
      <div className={classes.introSection}>
        <HomeFadeMotion as="p" className={classes.slogon}>
          「告別拖延！標籤分類 × 時間規劃，助你聚焦真正重要的事！」
        </HomeFadeMotion>
        <div className={classes.introduction1}>
          <HomeFadeMotion as="img" src={IntroductionImg1} />
          <HomeFadeMotion as="div">
            <p>GoalTracker可以幫助您設定每日目標</p>
          </HomeFadeMotion>
        </div>
        <div className={classes.introduction2}>
          <HomeFadeMotion as="img" src={IntroductionImg2} />
          <HomeFadeMotion as="div">
            <p>您可以新增各種標籤為您的目標分類</p>
            <p>以及選擇是否要為目標設定時間</p>
          </HomeFadeMotion>
        </div>
        <div className={classes.introduction3}>
          <HomeFadeMotion as="img" src={IntroductionImg3} />
          <div>
            <HomeFadeMotion as="p">
              您還能藉由勾選標籤顯示擁有該標籤的目標
            </HomeFadeMotion>
          </div>
        </div>
        <HomeFadeMotion as="div" className={classes.flootSlogon}>
          <p>「開始設定目標，讓每一天都踏實的前進！」😊</p>
          <div className={classes.startBtn}>
            <NavLink to="/">
              <button>開始設定目標</button>
            </NavLink>
          </div>
        </HomeFadeMotion>

        <div className={classes.Footer}></div>
      </div>
    </motion.div>
  );
}
