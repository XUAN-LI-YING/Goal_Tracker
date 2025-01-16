import classes from "./MainContent.module.css";
import { useState } from "react";

export default function MainContent() {
  const [showPopup, setShowPopup] = useState("false");

  const handleOuterClick = (e) => {
    if (e.target.tagName !== "INPUT") {
      setShowPopup("true");
    }
  };

  const closePopup = () => {
    setShowPopup("false");
  };

  return (
    <div className={classes.mainContent}>
      <select>
        <option value="Daily">Daily</option>
        <option value="Weekly">Weekly</option>
        <option value="Monthly">Monthly</option>
        <option value="Annual">Annual</option>
      </select>

      <h1>Daily Goals</h1>
      <div>
        <h2>2025 08 March</h2>
        <button>&lt;</button>
        <button>&gt;</button>
      </div>

      <div className={classes.goalLists}>
        {/* MAP */}
        <button onClick={handleOuterClick} className={classes.goal}>
          <input type="checkbox" />
          <p>這是一串文字</p>
          <div>
            <p>區塊 1 文字</p>
          </div>
          <div>
            <p>區塊 2 文字</p>
          </div>
        </button>
        <p>{showPopup}123</p>
        {showPopup && <button onClick={closePopup}>關閉</button>}
        <button>+</button>
      </div>
    </div>
  );
}
