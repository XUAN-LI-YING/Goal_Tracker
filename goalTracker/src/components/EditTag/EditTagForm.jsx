import CreateTag from "./CreateTag";
import classes from "./EditTagForm.module.css";
import { useEffect, useState } from "react";

//Img
import prePageImage from "../../assets/prevPage.png";

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
        &lt;
      </button>
      <div className={classes.editForm}>
        <p>Tag</p>
        <button onClick={createTag}>+</button>
        {showInput && <CreateTag />}
        {availableTags.map((tag) => (
          <div key={tag}>
            <span>{tag}</span>
            <button value={tag} onClick={removeTagFromDataBase}>
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
