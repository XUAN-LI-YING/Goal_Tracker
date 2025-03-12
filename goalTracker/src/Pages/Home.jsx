import coverImg from "../assets/cover.png";
import logoImg from "../assets/logo.png";
import classes from "./Home.module.css";
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <div className={classes.homeContent}>
      {/* <div className={classes.homeBar}>
        <img src={logoImg} />
      </div> */}
      <div className={classes.homeImg}>
        <img src={coverImg} />
        <NavLink to="/">
          <button>開始設定目標</button>
        </NavLink>
      </div>
    </div>
  );
}
