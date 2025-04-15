import { useEffect } from "react";
import classes from "./SelectDisplayTag.module.css";
import Swal from "sweetalert2";
//Animation
import { motion, AnimatePresence } from "framer-motion";

//Redux
import { selectTagAction } from "../../Store/SelectTagSlice";
import { useSelector, useDispatch } from "react-redux";
import { firstTimeAction } from "../../Store/FirstTimeSlice";

export function SelectDisplayTag({ displayTag }) {
  const dispatch = useDispatch();

  const previousDisplayTags = useSelector(
    (state) => state.SelectTagReducer.originDisplayTag
  );

  //goal是否在loading是的話displayTag則暫時是loading狀態已配合goal區域畫面的狀態達到視覺同步
  const isLoadingGoals = useSelector(
    (state) => state.DailyGoalsReducer.isLoadingGoals
  );

  //獲得哪些TAG被勾選的狀態
  const selectedTags = useSelector(
    (state) => state.SelectTagReducer.selectedGoalTag
  );

  console.log("displayTag", displayTag);
  console.log("selectedTags", selectedTags);

  //當goal改變時造成tag新增或刪除，並且保留留下來的tag的狀態
  //讓他即使更換日期時他還可以保持一樣的勾選狀態
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
    //主要用於當打開瀏覽器時將tag都預設為打勾
    dispatch(selectTagAction.addSelectedGoalTags(newTags));
    //存入目前勾選狀態
    dispatch(selectTagAction.setOriginDisplayTag(displayTag));
  }, [displayTag]);

  //只有第一次呼叫handleTagChange時才給使用者UX提示
  const isAlert = useSelector(
    (state) => state.FirstTimeReducer.shouldShowFilterAlert
  );

  function handleTagChange(e) {
    const checkTag = e.target.value;
    if (selectedTags.includes(checkTag)) {
      dispatch(selectTagAction.deleteSelectedGoalTag(checkTag));
    } else {
      dispatch(selectTagAction.addSelectedGoalTag(checkTag));
    }

    if (isAlert) {
      Swal.fire({
        title: "初次使用提示",
        html: "想讓這個目標不見？要在這個篩選區，把和他一樣的標籤<b>全部取消勾選</b>才行喔～",
        icon: "info",
        confirmButtonText: "了解",
        customClass: {
          confirmButton: "swalConfirmBtn"
        }
      });

      dispatch(firstTimeAction.stopShowFilterAlert());
    }
  }

  return (
    <div className={classes.tagSection}>
      {!isLoadingGoals && (
        <AnimatePresence mode="wait">
          <motion.ul
            key={displayTag.join(",")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0 }}
          >
            {displayTag.map((tag) => (
              <li key={tag}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag)}
                    onChange={handleTagChange}
                    value={tag}
                  />
                  <span className={classes.checkbox}></span>
                  <span>{tag}</span>
                </label>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
      )}
    </div>
  );
}
