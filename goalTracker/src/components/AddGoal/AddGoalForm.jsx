import { useState } from "react";
import { useEffect } from "react";

export function AddGoalForm() {
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
    document.activeElement?.blur(); // 讓當前按鈕失去焦點
    console.log("🎯 selectedTags 更新了:", selectedTags);
  }, [selectedTags]);

  const handleTagSelect = (event) => {
    console.log("我輩呼叫了");
    const selectedValue = event.target.value;
    const selectedIndex = event.target.Index;

    console.log("event.target", event.target);
    console.log(" selectedIndex", selectedIndex);
    console.log("selectedValue", selectedValue);
    if (selectedValue && !selectedTags.includes(selectedValue)) {
      setSelectedTags([...selectedTags, selectedValue]);
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    console.log("我輩呼叫了tagremove");
    console.log("tagToRemove", tagToRemove);
    console.log(
      "afterRemove",
      selectedTags.filter((tag) => tag !== tagToRemove)
    );
    // setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove));
    setTimeout(() => {
      setSelectedTags((prevTags) =>
        prevTags.filter((tag) => tag !== tagToRemove)
      );
    }, 0);
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
        <label>新增標籤：</label>
        <div>
          {selectedTags.map((tag, index) => (
            <div key={`${tag}-${index}-${selectedTags.length}`}>
              <span>{tag}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.target.blur();
                  console.log("🚀 按下刪除按鈕:", tag);
                  handleRemoveTag(tag);
                }}
              >
                ❌
              </button>
            </div>
          ))}
        </div>

        <div>
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
