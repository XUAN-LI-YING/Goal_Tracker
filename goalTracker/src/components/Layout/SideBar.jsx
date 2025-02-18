import classes from "./SideBar.module.css";
// React Router
import { Link } from "react-router-dom";
//Redux
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function SideBar() {
  const allGoalForTheDay = useSelector(
    (state) => state.DailyGoalsReducer.dailyGoals
  );

  useEffect(() => {
    const allGoalTagArray = allGoalForTheDay.map((goal) => goal.selectedTags);
    console.log("allGoalTagArray", allGoalTagArray);
  }, [allGoalForTheDay]);

  return (
    <div className={classes.leftSidebar}>
      <Link to="/home">
        <button>Home</button>
      </Link>
      <Link to="/personal">
        <button>
          <img src="user-avatar.jpg" alt="User Avatar" />
          <span>John Doe</span>
        </button>
      </Link>
      <Link to="/">
        <button>Goal</button>
      </Link>
      <div className={classes.tagSection}>
        <ul>
          {/* map.. */}
          <li>
            <label>
              <input type="checkbox" />

              <span>
                <span>📚</span>閱讀一本書
              </span>
            </label>
          </li>
        </ul>
      </div>
      <button>Logout</button>
    </div>
  );
}
