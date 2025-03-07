import { useState } from "react";
import { useGoalFormHook } from "../../Hooks/useGoalFormHook";
import classes from "./GoalDetail.module.css";
//Redux
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { editGoalThunk } from "../../Store/GetGoalSlice";
import {
  goalDetailModalAction,
  Detail_MODAL_CONTENT_ELEMENT
} from "../../Store/GoalDetailModalSlice";

export default function GoalDetail() {
  const dispatch = useDispatch();

  //get goal which you were ckicked
  const goal = useSelector((state) => state.GoalDetailModalReducer.displayGoal);

  //Get all tags
  const availableTags = useSelector((state) => state.GetTags.tags);

  //redux ,change modal element and  go edit tag page
  function goEditTagPage() {
    dispatch(
      goalDetailModalAction.displayElement(
        Detail_MODAL_CONTENT_ELEMENT.EDIT_TAG
      )
    );
  }

  //If Edit goal
  const disableEditGoal = useSelector(
    (state) => state.GoalDetailModalReducer.disableEditGoal
  );
  function handleIsEditGoal() {
    dispatch(goalDetailModalAction.disableEditGoal(false));
  }
  //call hook to incoming Form value、selected tags initial useState
  const initialGoal = {
    goalTextAndTime: goal,
    goalTags: goal.selectedTags
  };
  const {
    maxLength,
    handleChange,
    formValue,
    setFormValue,
    selectedTags,
    setSelectedTags,
    handleTagSelect,
    handleRemoveTag
  } = useGoalFormHook(initialGoal);
  const { year, month, day, isSetTime, goalTime, goalText, goalDetail } =
    formValue;

  //Update new goal ,after edit goal
  function handleUpdateGoal(e) {
    e.preventDefault();
    const newGoal = {
      ...goal,
      isSetTime,
      goalTime,
      goalText,
      goalDetail,
      selectedTags
    };

    dispatch(editGoalThunk({ year, month, day, newGoal, originalGoal: goal }));

    //以後可新增功能:當確定有正確新增到資料庫與redux時，才從修改頁面變為僅供觀看頁面
    dispatch(goalDetailModalAction.disableEditGoal(true));
  }

  //Unedit the target and restore the original target content
  function handleUndoGoal() {
    setFormValue(initialGoal.goalTextAndTime);
    setSelectedTags(initialGoal.goalTags);
    dispatch(goalDetailModalAction.disableEditGoal(true));
  }

  return (
    <form>
      <fieldset disabled={disableEditGoal} className={classes.goalForm}>
        <p>{`${year}年${month}月${day}日`}</p>

        <label>
          是否設定時間
          <div className={classes.radioSection}>
            <label className={classes.radio}>
              <input
                type="radio"
                name="isSetTime"
                value="yes"
                checked={isSetTime === "yes"}
                onChange={handleChange}
                required
              />
              <div className={classes.checked}></div>
              YES
            </label>
            <label className={classes.radio}>
              <input
                type="radio"
                name="isSetTime"
                value="no"
                checked={isSetTime === "no"}
                onChange={handleChange}
              />
              <div className={classes.checked}></div>
              NO
            </label>
          </div>
        </label>

        <label
          className={`${classes.goalTime} ${
            isSetTime === "yes" ? undefined : classes.disabled
          }`}
        >
          目標完成時間
          <input
            type="time"
            name="goalTime"
            value={goalTime}
            required
            onChange={handleChange}
            disabled={isSetTime === "no" ? true : false}
          />
        </label>
        <label className={classes.goalText}>
          目標名稱
          <input
            value={goalText}
            required
            onChange={handleChange}
            maxLength={maxLength}
            name="goalText"
          />
          {goalText.length === maxLength && (
            <p>已達{maxLength}字的字數上限！</p>
          )}
        </label>
        <label className={classes.goalDetail}>
          目標詳情
          <textarea
            value={goalDetail}
            required
            onChange={handleChange}
            placeholder="有關該目標的詳細內容或注意事項(可不填)"
            name="goalDetail"
          />
        </label>

        <div>
          {/* Selected tag list */}
          <div className={classes.labelSection}>
            <label>標籤</label>
            <div>
              {selectedTags.map((tag) => (
                <div key={tag}>
                  <span>{tag}</span>
                  {disableEditGoal === false && tag !== "無標籤" && (
                    <button
                      type="button"
                      onClick={(e) => {
                        handleRemoveTag(tag);
                      }}
                    >
                      ❌
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {disableEditGoal === false && (
            <div>
              <button type="button" onClick={goEditTagPage}>
                編輯
              </button>
              {availableTags.map((tag) => (
                <button
                  type="button"
                  key={tag}
                  value={tag}
                  onClick={handleTagSelect}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>
        {disableEditGoal === false && (
          <div className={classes.btnSection}>
            <button
              className={classes.submitBtn}
              type="submit"
              onClick={handleUpdateGoal}
            >
              確定
            </button>
            <button
              className={classes.cancelBtn}
              type="button"
              onClick={handleUndoGoal}
            >
              取消
            </button>
          </div>
        )}
      </fieldset>
      {disableEditGoal === true && (
        <div className={classes.btnSection}>
          <button
            className={classes.editBtn}
            type="button"
            onClick={handleIsEditGoal}
          >
            修改
          </button>
          <button
            className={classes.closeBtn}
            type="button"
            onClick={() => dispatch(goalDetailModalAction.closeDetailModal())}
          >
            關閉
          </button>
        </div>
      )}
    </form>
  );
}
