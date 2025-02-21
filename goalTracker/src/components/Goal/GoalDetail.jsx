import { useState } from "react";
import { useGoalFormHook } from "../../Hooks/useGoalFormHook";
//Redux
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export function GoalDetail() {
  const dispatch = useDispatch();
  //get goal which you were ckicked
  const goal = useSelector((state) => state.GoalDetailModalReducer.displayGoal);

  //Get all tags
  const availableTags = useSelector((state) => state.GetTags.tags);

  // Tags handling
  //store selected tags
  const [selectingTags, setSelectingTags] = useState(goal.selectedTags);

  const handleTagSelect = (event) => {
    const selectingValue = event.target.value;

    if (selectingValue && !selectingTags.includes(selectingValue)) {
      setSelectingTags([...selectingTags, selectingValue]);
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setSelectingTags(selectingTags.filter((tag) => tag !== tagToRemove));
  };
  console.log("selectingTags", selectingTags);

  //redux ,change modal element
  function goEditTagPage() {}

  //If Edit goal
  const [disableEditGoal, setDisableEditGoal] = useState(true);

  function handleEditGoal() {
    setDisableEditGoal(false);
  }
  //Form value useState
  const { formValue, maxLength, handleChange } = useGoalFormHook(goal);
  const { year, month, day, isSetTime, goalTime, goalText, goalDetail } =
    formValue;

  return (
    <form>
      <fieldset disabled={disableEditGoal}>
        <p>{`${year}年${month}月${day}日`}</p>
        <label>
          目標名稱：{" "}
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

        <label>
          是否設定時間：{" "}
          <label>
            <input
              type="radio"
              name="isSetTime"
              value="yes"
              checked={isSetTime === "yes"}
              onChange={handleChange}
              required
            />
            YES
          </label>
          <label>
            <input
              type="radio"
              name="isSetTime"
              value="no"
              checked={isSetTime === "no"}
              onChange={handleChange}
            />
            NO
          </label>
        </label>

        <label>
          目標完成時間：{" "}
          <input
            type="time"
            name="goalTime"
            value={goalTime}
            required
            onChange={handleChange}
            disabled={isSetTime === "no" ? true : false}
          />
        </label>
        <label>
          目標詳情：{" "}
          <input
            value={goalDetail}
            required
            onChange={handleChange}
            placeholder="有關該目標的詳細內容或注意事項(可不填)"
            name="goalDetail"
          />
        </label>

        <div>
          {/* Selected tag list */}
          <div>
            <label>標籤：</label>
            <div>
              {selectingTags.map((tag) => (
                <div key={tag}>
                  <span>{tag}</span>
                  {disableEditGoal === false && (
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
        {disableEditGoal === false && <button type="submit">確定</button>}
      </fieldset>
      {disableEditGoal === true && (
        <button type="button" onClick={handleEditGoal}>
          修改
        </button>
      )}
    </form>
  );
}
