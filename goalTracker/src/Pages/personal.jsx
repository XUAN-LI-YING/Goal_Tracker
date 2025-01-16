import { useState } from "react";
import Picker from "@emoji-mart/react";

export default function Personal() {
  const [inputText, setInputText] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("選擇 Emoji");
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(emoji.native);
    setIsPickerVisible(false);
  };

  return (
    <div>
      <h1>Emoji Input</h1>
      <div>
        <input
          type="text"
          placeholder="輸入文字"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button onClick={() => setIsPickerVisible(!isPickerVisible)}>
          {selectedEmoji}
          {inputText}
        </button>
        {isPickerVisible && (
          <div>
            <Picker onEmojiSelect={handleEmojiSelect} />
          </div>
        )}
      </div>
      <p>
        選擇的 Emoji: {selectedEmoji} {inputText}
      </p>
    </div>
  );
}
