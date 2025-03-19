//image
import coverImg from "../assets/cover.webp";
import logoImg from "../assets/logo.png";
//css、motion
import classes from "./Home.module.css";
import { motion } from "framer-motion";
//Router
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <motion.div
      className={classes.homeContent}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className={classes.homeBar}>
        <p>GoalTracker</p>
      </div>

      <div className={classes.homeImg}>
        <img src={coverImg} />
      </div>
      <div className={classes.startBtn}>
        <NavLink to="/">
          <button>開始設定目標</button>
        </NavLink>
      </div>
    </motion.div>
  );
}
