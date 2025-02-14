import { useState } from "react";
import Picker from "@emoji-mart/react";

//Database
import { db } from "../../FireBase/FireBaseConfig";
import { setDoc, doc } from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTagsAction } from "../Store/GetTagsSlice";

export default function CreateTag() {
  const [inputText, setInputText] = useState("");
  const defaultSelectedEmoji = "選擇 Emoji";
  const [selectedEmoji, setSelectedEmoji] = useState(defaultSelectedEmoji);
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  //emoji select
  const handleEmojiSelect = (emoji) => {
    console.log(emoji);
    setSelectedEmoji(emoji.native);
    setIsPickerVisible(false);
  };

  //Check if the form is valid

  const isFormValid =
    selectedEmoji !== defaultSelectedEmoji && inputText.trim();

  useEffect(() => {
    console.log("isFormValid", isFormValid);
    console.log("hasSubmitted", hasSubmitted);
  }, [isFormValid, hasSubmitted]);

  //post tags to database and redux store
  const dispatch = useDispatch();

  async function postTag(e) {
    e.preventDefault();
    setHasSubmitted(true);

    if (!isFormValid) {
      return;
    }

    try {
      dispatch(getTagsAction.addTag(`${selectedEmoji}${inputText}`));

      const docRef = await setDoc(
        doc(db, "users", "userxuan", "tags", `${selectedEmoji}${inputText}`),
        {
          tag: `${selectedEmoji}${inputText}`
        }
      );
      // console.log(docRef.id);
      setInputText("");
      setSelectedEmoji(defaultSelectedEmoji);
      setHasSubmitted(false);
    } catch (error) {
      console.error("Firestore 錯誤:", error.message);
    }
  }

  return (
    <div>
      <form onSubmit={postTag}>
        <button
          type="button"
          onClick={() => setIsPickerVisible(!isPickerVisible)}
        >
          {selectedEmoji}
        </button>
        <input
          type="text"
          placeholder="輸入文字"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button type="submit">新增</button>
        {hasSubmitted && !isFormValid && (
          <p>請選擇欲新增標籤的Emoji以及填入標籤名稱!</p>
        )}

        {isPickerVisible && (
          <div>
            <Picker
              set="facebook"
              emoji="department_store"
              onEmojiSelect={handleEmojiSelect}
              icons="outline"
              previewPosition="none"
            />
          </div>
        )}
      </form>
    </div>
  );
}
