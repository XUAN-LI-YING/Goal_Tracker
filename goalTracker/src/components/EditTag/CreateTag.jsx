import { useState } from "react";
import Picker from "@emoji-mart/react";

//Database
import { db } from "../../FireBase/FireBaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useEffect } from "react";

export default function CreateTag() {
  const [inputText, setInputText] = useState("");
  const defaultSelectedEmoji = "選擇 Emoji";
  const [selectedEmoji, setSelectedEmoji] = useState(defaultSelectedEmoji);
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [isErrorVisible, setErrorVisible] = useState(false);

  //emoji select
  const handleEmojiSelect = (emoji) => {
    console.log(emoji);
    setSelectedEmoji(emoji.native);
    setIsPickerVisible(false);
  };

  //post tags

  // const FormFilledIn

  useEffect(() => {
    console.log("isErrorVisible", isErrorVisible);
  }, [isErrorVisible]);

  function postTag(e) {
    e.preventDefault();
    if (inputText && selectedEmoji !== defaultSelectedEmoji) {
      addData();
      setErrorVisible(false);
    } else {
      setErrorVisible(true);
      return;
    }

    async function addData() {
      try {
        const docRef = await addDoc(collection(db, "tags"), {
          tag: `${selectedEmoji}${inputText}`
        });
        console.log(docRef.id);
        setInputText("");
        setSelectedEmoji("選擇 Emoji");
      } catch (error) {
        console.error("Firestore 錯誤:", error.message);
      }
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
        {isErrorVisible && <p>請選擇標籤的icon以及填入標籤名稱!</p>}

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
