import classes from "./SideBar.module.css";
import { useEffect, useMemo } from "react";
import { SelectDisplayTag } from "../SelectdisplayTag/SelectdisplayTag";

//img
import homeIcon from "../../assets/home.png";
import userIcon from "../../assets/user.png";
import goalIcon from "../../assets/goal.png";

// React Router
import { NavLink, useLocation } from "react-router-dom";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { loginAction } from "../../Store/LoginSlice";

export default function SideBar() {
  const dispatch = useDispatch();

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

  //if login or not
  //display or hide log out button
  const accountNum = useSelector((state) => state.LoginReducer.accountNum);
  //lOG OUT

  function logOutHandle() {
    document.cookie =
      "accountNum=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    dispatch(loginAction.logOutAccount());
  }
  return (
    <div className={classes.leftSidebar} onClick={(e) => e.stopPropagation()}>
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

      {accountNum && (
        <button className={classes.logOut} onClick={logOutHandle}>
          登出
        </button>
      )}
    </div>
  );
}
