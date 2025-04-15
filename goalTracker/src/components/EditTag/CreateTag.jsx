import { useState, lazy, Suspense } from "react";
import classes from "./CreateTag.module.css";

//Redux
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTagsAction } from "../../Store/GetTagsSlice";
import { postTagThunk } from "../../Store/GetTagsSlice";

const LazyPicker = lazy(() => import("@emoji-mart/react"));

export default function CreateTag() {
  const [inputText, setInputText] = useState("");
  const defaultSelectedEmoji = "選擇 Emoji";
  const [selectedEmoji, setSelectedEmoji] = useState(defaultSelectedEmoji);
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  //emoji select
  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(emoji.native);
    setIsPickerVisible(false);
  };

  //Check if the form is valid

  const isFormValid =
    selectedEmoji !== defaultSelectedEmoji && inputText.trim();

  //post tags to database and redux store
  const dispatch = useDispatch();

  async function postTag(e) {
    e.preventDefault();
    setHasSubmitted(true);

    if (!isFormValid) {
      return;
    }

    dispatch(getTagsAction.addTag(`${selectedEmoji}${inputText}`));
    dispatch(postTagThunk(`${selectedEmoji}${inputText}`));

    //可以根據thunk extraReducers狀態改變ui，當狀態是fullfill才清空記憶
    setInputText("");
    setSelectedEmoji(defaultSelectedEmoji);
    setHasSubmitted(false);
  }

  return (
    <div>
      <form onSubmit={postTag} className={classes.addTag}>
        <div>
          <button
            type="button"
            onClick={() => setIsPickerVisible(!isPickerVisible)}
          >
            {selectedEmoji}
          </button>
          <div>
            <input
              type="text"
              placeholder="輸入文字"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              maxLength="10"
            />
            <button type="submit">新增</button>
          </div>
        </div>

        {inputText.length >= 10 && <p>已達字數上限(最多只能輸入10個字)</p>}
        {isPickerVisible && (
          <div className={classes.picker}>
            <Suspense fallback={<p className={classes.loading}>載入中...</p>}>
              <LazyPicker
                theme="light"
                emoji="department_store"
                onEmojiSelect={handleEmojiSelect}
                icons="outline"
                previewPosition="none"
              />
            </Suspense>
          </div>
        )}
        {hasSubmitted && !isFormValid && (
          <p className={classes.prompt}>請選擇Emoji並填入標籤名稱!</p>
        )}
      </form>
    </div>
  );
}
