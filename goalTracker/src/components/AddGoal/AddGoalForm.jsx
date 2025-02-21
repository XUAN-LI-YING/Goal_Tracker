import { useState } from "react";

//REDUX
import { modalAction, MODAL_CONTENT_ELEMENT } from "../../Store/ModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { dailyGoalsAction, postGoalThunk } from "../../Store/GetGoalSlice";

export function AddGoalForm({ availableTags }) {
  //redux ,change modal element
  const dispatch = useDispatch();
  function goEditPage() {
    dispatch(modalAction.displayElement(MODAL_CONTENT_ELEMENT.EDIT_TAG));
  }

  //get day
  const editDate = useSelector((state) => state.Date);
  const { year, month, day } = editDate;

  //Form value
  const { formValue, maxLength, handleChange } = useGoalFormHook({
    isSetTime: "",
    goalTime: "",
    goalText: "",
    goalDetail: ""
  });

  const { isSetTime, goalTime, goalText, goalDetail } = formValue;
  console.log("formValue", formValue);

  // Tags handling
  //store selected tags
  const [selectedTags, setSelectedTags] = useState([]);

  const handleTagSelect = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue && !selectedTags.includes(selectedValue)) {
      setSelectedTags([...selectedTags, selectedValue]);
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove));
  };

  //Confirm to add new goal
  async function addNewGoal(e) {
    e.preventDefault();
    //generate docID first in order to  store on redux state immediately
    let newGoal = {
      year,
      month,
      day,
      isSetTime,
      goalTime,
      goalText,
      goalDetail,
      selectedTags,
      isComplete: false
    };

    dispatch(postGoalThunk({ year, month, day, newGoal }));

    //以後可以根據post 資料庫狀態使用extraReducers來選擇是否要reset
    setFormValue({
      isSetTime: "",
      goalTime: "",
      goalText: "",
      goalDetail: ""
    });
    setSelectedTags([]);
  }

  return (
    <form onSubmit={addNewGoal}>
      <p>
        Added target to {year}/{month}/{day}
      </p>
      <label>
        是否設定時間
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
          disabled={isSetTime === "yes" ? false : true}
        />
      </label>

      <div>
        <label>
          輸入目標（最多 {maxLength} 個字）：{" "}
          <input
            type="text"
            name="goalText"
            value={goalText}
            onChange={handleChange}
            maxLength={30}
            required
          />
          {goalText.length === maxLength && <p>已達字數上限！</p>}
        </label>
      </div>
      <label>
        目標詳情：{" "}
        <textarea
          name="goalDetail"
          rows="5"
          cols="30"
          placeholder="有關該目標的詳細內容或注意事項(可不填)"
          onChange={handleChange}
          value={goalDetail}
        ></textarea>
      </label>
      <div>
        {/* Selected tag list */}
        <div>
          <label>選擇標籤：</label>
          <div>
            {selectedTags.map((tag) => (
              <div key={tag}>
                <span>{tag}</span>
                <button
                  onClick={(e) => {
                    console.log("🚀 按下刪除按鈕:", tag);
                    handleRemoveTag(tag);
                  }}
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <button type="button" onClick={goEditPage}>
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
      </div>
      <button type="submit">確定</button>
    </form>
  );
}
