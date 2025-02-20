import classes from "./SideBar.module.css";
import { useMemo } from "react";
import { SelectDisplayTag } from "../SelectdisplayTag/SelectdisplayTag";
// React Router
import { Link } from "react-router-dom";
//Redux
import { useSelector } from "react-redux";

export default function SideBar() {
  // const dispatch = useDispatch();

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
      <SelectDisplayTag displayTag={displayTag} />

      <button>Logout</button>
    </div>
  );
}
