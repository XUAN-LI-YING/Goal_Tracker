import CreateTag from "./CreateTag";

import { useEffect, useState } from "react";

//Redux
import { useDispatch } from "react-redux";
import { getTagsAction } from "../Store/GetTagsSlice";

//Firebase Database
import { db } from "../../FireBase/FireBaseConfig";
import { deleteDoc, doc } from "firebase/firestore";

export function EditTagForm({ availableTags }) {
  //show input to create tag
  const [showInput, setShowInput] = useState(false);
  function createTag() {
    setShowInput(!showInput);
  }

  //Remove tag from dataBase
  const dispatch = useDispatch();
  function removeTagFromDataBase(e) {
    const deleteTag = e.target.value;
    dispatch(getTagsAction.removeTag(deleteTag));

    deleteDoc(doc(db, "users", "userxuan", "tags", deleteTag))
      .then(() => {
        alert("刪除成功!");
      })
      .catch((error) => {
        console.error("刪除失敗", error);
      });
  }

  return (
    <div>
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
  );
}
