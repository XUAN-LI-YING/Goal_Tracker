import classes from "./SideBar.module.css";
import { useMemo } from "react";
import { SelectDisplayTag } from "../SelectdisplayTag/SelectdisplayTag";
// React Router
import { Link, useLocation } from "react-router-dom";

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
      <Link to="/home">
        <button className={classes.homeBtn}>首頁</button>
      </Link>
      <Link to="/personal">
        <button>
          <img src="user-avatar.jpg" alt="My Profile" />
          <span>個人中心</span>
        </button>
      </Link>
      <Link to="/">
        <button>目標管理</button>
      </Link>
      {location.pathname === "/" && (
        <SelectDisplayTag displayTag={displayTag} />
      )}

      <button>Logout</button>
    </div>
  );
}
