import { useGoalFormHook } from "../../Hooks/useGoalFormHook";
import classes from "./AddGoalForm.module.css";
import { useEffect } from "react";
import TimePickerComponent from "./TimePickerComponent";
//REDUX
import { modalAction, MODAL_CONTENT_ELEMENT } from "../../Store/ModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { postGoalThunk } from "../../Store/GetGoalSlice";
import { selectTagAction } from "../../Store/SelectTagSlice";

export function AddGoalForm({ availableTags }) {
  //redux ,change modal element
  const dispatch = useDispatch();
  function goEditPage() {
    dispatch(modalAction.displayElement(MODAL_CONTENT_ELEMENT.EDIT_TAG));
  }

  //get day
  const editDate = useSelector((state) => state.Date);
  const { year, month, day } = editDate;

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
  //Form value
  const { isSetTime, goalTime, goalText, goalDetail } = formValue;
  console.log("formValue", formValue);

  //sessionStorage
  useEffect(() => {
    sessionStorage.setItem("addGoalForm", JSON.stringify(formValue));
    sessionStorage.setItem("addGoalFormTag", JSON.stringify(selectedTags));
  }, [formValue, selectedTags]);

  function handleInitial() {
    if (sessionStorage.getItem("addGoalForm")) {
      const goalTextAndTime = JSON.parse(sessionStorage.getItem("addGoalForm"));
      const goalTags = JSON.parse(sessionStorage.getItem("addGoalFormTag"));

      return {
        goalTextAndTime,
        goalTags
      };
    } else {
      return {
        goalTextAndTime: {
          isSetTime: "",
          goalTime: "",
          goalText: "",
          goalDetail: ""
        },
        goalTags: []
      };
    }
  }

  //Confirm to add new goal
  async function addNewGoal(e) {
    e.preventDefault();

    //generate docID first in order to  store on redux state immediately
    const newGoal = {
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

    //這是為了讓新增/編輯goal後讓他所有的標籤在標籤篩選區都是被勾選的狀態用來保證顯示這個被新增/編輯的goal
    // 雖然在selectedTag.jsx中已經設定凡是新加入的標籤都一定是會被勾選得
    // (也就是只需要讓之前已經存在但卻被取消勾選的tag再度被勾選
    // 但沒關係這裡在加入一次，addSelectedGoalTags slice會篩選重複加入勾選區域的tag
    dispatch(selectTagAction.addSelectedGoalTags(selectedTags));

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
    <form onSubmit={addNewGoal} className={classes.addGoalForm}>
      <p>
        新增目標至{year}/{month}/{day}
      </p>
      <div className={classes.goalTime}>
        <div>
          <p>是否設定時間</p>
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
              required
            />
            <div className={classes.checked}></div>
            NO
          </label>
        </div>
        <div>
          <label
            className={`${isSetTime === "yes" ? undefined : classes.disabled}`}
          >
            <span>目標完成時間</span>
            {/* <input
              type="time"
              name="goalTime"
              value={goalTime}
              required
              onChange={handleChange}
              disabled={isSetTime === "yes" ? false : true}
            /> */}
            <TimePickerComponent
              name="goalTime"
              value={goalTime}
              required={true}
              onChange={handleChange}
              disabled={isSetTime === "yes" ? false : true}
            />
          </label>
        </div>
      </div>
      <div>
        <label className={classes.goalText}>
          輸入目標（最多 {maxLength} 個字）
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
      <label className={classes.goalDetail}>
        目標詳情
        <textarea
          name="goalDetail"
          rows="5"
          cols="30"
          placeholder="有關該目標的詳細內容或注意事項(可不填)"
          onChange={handleChange}
          value={goalDetail}
        ></textarea>
      </label>

      {/* Selected tag list */}
      <div className={classes.selectedTags}>
        <div>
          <label>選擇標籤</label>
          <button
            className={classes.editTag}
            type="button"
            onClick={goEditPage}
          >
            編輯
          </button>
        </div>
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
        <div className={classes.line}></div>
        <div className={classes.tagInput}>
          {selectedTags.map((tag) => (
            <div className={classes.tag} key={tag}>
              <span>{tag}</span>
              {tag !== "無標籤" && (
                <button
                  type="button"
                  onClick={(e) => {
                    console.log("🚀 按下刪除按鈕:", tag);
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

      <button className={classes.submitGoal} type="submit">
        確定
      </button>
    </form>
  );
}
