import CreateTag from "./CreateTag";

import { useEffect, useState } from "react";

export function EditTagForm() {
  const availableTags = [
    "🍎重要",
    "🍌急件",
    "🍒讀書",
    "🍇運動",
    "🚀工作",
    "👉娛樂"
  ];

  //show input to create tag

  const [showInput, setShowInput] = useState(false);
  function createTag() {
    setShowInput(!showInput);
  }

  useEffect(() => {
    console.log(showInput);
  }, [showInput]);
  return (
    <div>
      <p>Tag</p>
      <button onClick={createTag}>+</button>
      {showInput && <CreateTag />}
      {availableTags.map((tag) => (
        <div key={tag}>
          <span>{tag}</span>
          <button>X</button>
        </div>
      ))}
    </div>
  );
}
