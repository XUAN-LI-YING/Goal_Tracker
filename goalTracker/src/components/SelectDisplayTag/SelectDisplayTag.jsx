import { useEffect } from "react";
import classes from "./SelectDisplayTag.module.css";
//Redux
import { selectTagAction } from "../../Store/SelectTagSlice";
import { useSelector, useDispatch } from "react-redux";

export function SelectDisplayTag({ displayTag }) {
  const dispatch = useDispatch();
  //獲得哪些TAG被勾選的狀態
  const previousDisplayTags = useSelector(
    (state) => state.SelectTagReducer.originDisplayTag
  );
  const selectedTags = useSelector(
    (state) => state.SelectTagReducer.selectedGoalTag
  );

  //當goal改變時造成tag新增或刪除，並且保留留下來的tag的狀態
  useEffect(() => {
    // 取得原本的tag中沒有的tag,也就是新加入的tag
    const newTags = displayTag.filter(
      (tag) => !previousDisplayTags.includes(tag)
    );
    //記住新tag中已經用不到的tag
    const deleteTags = previousDisplayTags.filter(
      (tag) => !displayTag.includes(tag)
    );

    //刪除用不到且有被打勾有顯示的tag
    dispatch(selectTagAction.deleteSelectedGoalTags(deleteTags));
    //加入新的tag並且讓他預設打勾顯示
    dispatch(selectTagAction.addSelectedGoalTags(newTags));
    //存入目前勾選狀態
    dispatch(selectTagAction.setOriginDisplayTag(displayTag));
  }, [displayTag]);

  function handleTagChange(e) {
    const checkTag = e.target.value;
    if (selectedTags.includes(checkTag)) {
      dispatch(selectTagAction.deleteSelectedGoalTag(checkTag));
    } else {
      dispatch(selectTagAction.addSelectedGoalTag(checkTag));
    }
  }

  return (
    <div className={classes.tagSection}>
      <ul>
        {displayTag.map((tag) => (
          <li key={tag}>
            <label>
              <input
                type="checkbox"
                checked={selectedTags.includes(tag)}
                onChange={handleTagChange}
                value={tag}
              />
              <span>{tag}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
