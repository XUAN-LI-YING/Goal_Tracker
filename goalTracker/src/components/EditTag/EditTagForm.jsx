import CreateTag from "./CreateTag";
import classes from "./EditTagForm.module.css";
import { useEffect, useState } from "react";

//Img
import prevPageImage from "../../assets/prevPage.png";
import addImage from "../../assets/add.png";

//Redux
import { useDispatch } from "react-redux";
import { getTagsAction, deleteTagThunk } from "../../Store/GetTagsSlice";
import { MODAL_CONTENT_ELEMENT } from "../../Store/ModalSlice";
import { modalAction } from "../../Store/ModalSlice";
import {
  goalDetailModalAction,
  Detail_MODAL_CONTENT_ELEMENT
} from "../../Store/GoalDetailModalSlice";

export default function EditTagForm({ availableTags, prev }) {
  const dispatch = useDispatch();

  //show input to create tag
  const [showInput, setShowInput] = useState(false);
  function createTag() {
    setShowInput(!showInput);
  }

  //Remove tag from dataBase
  function removeTagFromDataBase(e) {
    const deleteTag = e.target.value;
    dispatch(getTagsAction.removeTag(deleteTag));
    dispatch(deleteTagThunk(deleteTag));

    //使用者暫存在session的tag狀態
    const sessionKeys = ["addGoalFormTag", "editGoalFormTag"];

    sessionKeys.forEach((key) => {
      const sessionTags = sessionStorage.getItem(key);
      if (!sessionTags) return;

      const tags = JSON.parse(sessionTags);
      if (!tags.includes(deleteTag)) return;

      const updated = tags.filter((tag) => tag !== deleteTag);
      sessionStorage.setItem(key, JSON.stringify(updated));
    });
  }
  //Go previous page(addGoalPage)
  function goPrePage() {
    if (prev === "addGoal") {
      dispatch(modalAction.displayElement(MODAL_CONTENT_ELEMENT.ADD_GOAL));
    } else {
      dispatch(
        goalDetailModalAction.displayElement(
          Detail_MODAL_CONTENT_ELEMENT.EDIT_GOAL
        )
      );
    }
  }

  return (
    <div className={classes.editContainer}>
      <button onClick={goPrePage} className={classes.prePageBtn}>
        <img src={prevPageImage} />
      </button>
      <div className={classes.editForm}>
        <div>
          <p>所有標籤</p>
          <button className={classes.addBtn} onClick={createTag}>
            <img src={addImage} />
          </button>
        </div>
        {showInput && <CreateTag />}
        <div className={classes.tagList}>
          {availableTags.map((tag) => (
            <div className={classes.tag} key={tag}>
              <span>{tag}</span>
              <button value={tag} onClick={removeTagFromDataBase}>
                ❌
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
