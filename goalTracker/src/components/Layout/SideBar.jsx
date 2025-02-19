import classes from "./SideBar.module.css";
import { useEffect, useMemo, useState } from "react";

// React Router
import { Link } from "react-router-dom";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { dailyGoalsAction } from "../Store/GetGoalSlice";
import { selectTagAction } from "../Store/SelectTagSlice";
export default function SideBar() {
  const dispatch = useDispatch();
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
  console.log("displayTag", displayTag);
  //Is tag checked or not
  let origDisplayTag = useSelector(
    (state) => state.selectedTagsReducer.originDiplayTag
  );

  const selectedTags = useSelector(
    (state) => state.selectedTagsReducer.selectedGoalTag
  );
  //當goal改變時造成tag新增或刪除，並且保留留下來的tag的狀態
  useEffect(() => {
    // 取得原本的tag中沒有的tag,也就是新加入的tag
    const newTags = displayTag.filter((tag) => !origDisplayTag.includes(tag));
    //記住新tag中已經用不到的tag
    const deleteTags = origDisplayTag.filter(
      (tag) => !displayTag.includes(tag)
    );
    //刪除用不到且有被打勾有顯示的tag
    dispatch(selectTagAction.deleteSelectedGoalTags(deleteTags));
    //加入新的tag並且讓他預設打勾顯示
    dispatch(selectTagAction.deleteSelectedGoalTags(newTags));
    dispatch(selectTagAction.setOriginDiplayTag(displayTag));
  }, [displayTag]);

  function tagCheck(e) {
    const checkTag = e.target.value;
    if (selectedTags.includes(checkTag)) {
      dispatch(selectTagAction.addSelectedGoalTag(checkTag));
    } else {
      dispatch(selectTagAction.deleteSelectedGoalTag(checkTag));
    }
  }

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
          {displayTag.map((tag) => (
            <li key={tag}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag)}
                  onChange={tagCheck}
                  value={tag}
                />
                <span>{tag}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
      <button>Logout</button>
    </div>
  );
}
