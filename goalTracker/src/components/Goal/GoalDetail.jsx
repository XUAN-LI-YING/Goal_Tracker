import { useState, useEffect } from "react";
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
    //Session Storage editing  content
    sessionStorage.setItem("editGoalForm", JSON.stringify(formValue));
    sessionStorage.setItem("editGoalFormTag", JSON.stringify(selectedTags));

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
  const initialGoal = handleInitial();
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

  function handleInitial() {
    if (sessionStorage.getItem("editGoalForm")) {
      const goalTextAndTime = JSON.parse(
        sessionStorage.getItem("editGoalForm")
      );
      const goalTags = JSON.parse(sessionStorage.getItem("editGoalFormTag"));
      console.log("有東西!😑");
      return {
        goalTextAndTime,
        goalTags
      };
    } else {
      console.log("沒東西!😑");

      return {
        goalTextAndTime: goal,
        goalTags: goal.selectedTags
      };
    }
  }

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
    //session
    sessionStorage.removeItem("editGoalForm");
    sessionStorage.removeItem("editGoalFormTag");
    //
    setFormValue(initialGoal.goalTextAndTime);
    setSelectedTags(initialGoal.goalTags);
    dispatch(goalDetailModalAction.disableEditGoal(true));
  }

  //handle close modal
  function handleClose() {
    //session
    sessionStorage.removeItem("editGoalForm");
    sessionStorage.removeItem("editGoalFormTag");
    //
    dispatch(goalDetailModalAction.closeDetailModal());
  }

  return (
    <form>
      <fieldset disabled={disableEditGoal} className={classes.goalForm}>
        <p>{`${year}年${month}月${day}日`}</p>

        <label className={classes.radioSection}>
          是否設定時間
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
          {goalText.length === maxLength && disableEditGoal === false && (
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
          <div className={classes.selectedTags}>
            <label>標籤</label>
            <div className={classes.tagInput}>
              {selectedTags.map((tag) => (
                <div className={classes.tag} key={tag}>
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
          <div className={classes.line}></div>

          {disableEditGoal === false && (
            <div className={classes.labelBtnSection}>
              <button
                className={classes.editTag}
                type="button"
                onClick={goEditTagPage}
              >
                編輯
              </button>
              <div className={classes.labelOptions}>
                {availableTags.map((tag) => (
                  <button
                    className={classes.tagBtn}
                    type="button"
                    key={tag}
                    value={tag}
                    onClick={handleTagSelect}
                  >
                    {tag}
                  </button>
                ))}
              </div>
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
              className={classes.cancleBtn}
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
            onClick={handleClose}
          >
            關閉
          </button>
        </div>
      )}
    </form>
  );
}
