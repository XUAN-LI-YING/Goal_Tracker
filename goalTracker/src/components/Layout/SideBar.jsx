import classes from "./SideBar.module.css";
import { useMemo } from "react";
import { SelectDisplayTag } from "../SelectdisplayTag/SelectdisplayTag";

//img
import homeIcon from "../../assets/home.png";
import userIcon from "../../assets/user.png";
import goalIcon from "../../assets/goal.png";

// React Router
import { NavLink, useLocation } from "react-router-dom";

//Redux
import { useSelector } from "react-redux";

export default function SideBar() {
  //Get current URL
  const location = useLocation();

  //get display tag
  const allGoalForTheDay = useSelector(
    (state) => state.DailyGoalsReducer.dailyGoals
  );
  const { displayTag } = useMemo(() => {
    const allGoalTagArray = allGoalForTheDay.map((goal) => goal.selectedTags);
    const flatAllGoalTag = allGoalTagArray.flat();
    const displayTag = [...new Set(flatAllGoalTag)];
    return { allGoalTagArray, displayTag };
  }, [allGoalForTheDay]);
  // console.log("displayTag", displayTag);

  return (
    <div className={classes.leftSidebar}>
      <NavLink
        to="/home"
        className={({ isActive }) => (isActive ? classes.active : undefined)}
      >
        <img src={homeIcon} alt="Go to home page" />
        首頁
      </NavLink>
      <NavLink
        to="/personal"
        className={({ isActive }) => (isActive ? classes.active : undefined)}
      >
        <img src={userIcon} alt="Go to person center page" />
        個人中心
      </NavLink>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? classes.active : undefined)}
      >
        <img src={goalIcon} alt="Go to manage target page" />
        目標管理
      </NavLink>
      {location.pathname === "/" && (
        <SelectDisplayTag displayTag={displayTag} />
      )}

      {/* <button>Logout</button> */}
    </div>
  );
}
