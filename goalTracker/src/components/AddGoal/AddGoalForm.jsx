import { useState } from "react";
import { useEffect } from "react";
//REDUX
import { ModalAction } from "../Store/ModalSlice";
import { useDispatch } from "react-redux";
import { MODAL_CONTENT_ELEMENT } from "../Store/ModalSlice";

export function AddGoalForm() {
  //redux ,change modal element
  const dispatch = useDispatch();
  function goEditPage() {
    dispatch(ModalAction.displayElement(MODAL_CONTENT_ELEMENT.EDIT_TAG));
  }

  // Input goal text
  const [text, setText] = useState("");
  const maxLength = 30;

  const handleChange = (e) => {
    const newText = e.target.value;
    if (newText.length <= maxLength) {
      setText(newText);
    }
  };

  // Tags handling
  //store selected tags
  const [selectedTags, setSelectedTags] = useState([]);
  const availableTags = [
    "🍎重要",
    "🍌急件",
    "🍒讀書",
    "🍇運動",
    "🚀工作",
    "👉娛樂"
  ];
  useEffect(() => {
    console.log("🎯 selectedTags 更新了:", selectedTags);
  }, [selectedTags]);

  const handleTagSelect = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue && !selectedTags.includes(selectedValue)) {
      setSelectedTags([...selectedTags, selectedValue]);
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      <p>新增目標至2025/06/12</p>
      <label>
        目標完成時間： <input type="time" defaultValue="08:00" required />
      </label>

      <div>
        <label>
          輸入目標（最多 {maxLength} 個字）：{" "}
          <input type="text" value={text} onChange={handleChange} />
        </label>
        {text.length >= maxLength && <p>已達字數上限！</p>}
      </div>
      <label>
        備註：{" "}
        <textarea
          name="textarea"
          rows="5"
          cols="30"
          placeholder="有關該目標的詳細內容或注意事項"
        ></textarea>
      </label>

      <div>
        {/* Selected tag list */}
        <div>
          <label>選擇標籤：</label>
          <div>
            {selectedTags.map((tag, index) => (
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
          <button onClick={goEditPage}>編輯</button>
          {availableTags.map((tag) => (
            <button key={tag} value={tag} onClick={handleTagSelect}>
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
