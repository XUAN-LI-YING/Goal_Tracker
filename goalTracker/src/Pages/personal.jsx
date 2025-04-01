import classes from "./Personal.module.css";
import userSticker from "../assets/userSticker.webp";
import PersonNumberMotion from "../components/UI/PersonNumberMotion";
//react router
import { useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
("use client");

export default function Personal() {
  const { yearCompleteNum, monthCompleteNum, dayCompleteNum } = useLoaderData();

  const userName = useSelector((state) => state.LoginReducer.accountNum);

  return (
    <div className={classes.userSection}>
      <div className={classes.userName}>
        <img src={userSticker} className={classes.userSticker} />
        {!userName ? <p>使用者名稱</p> : <p>{userName}</p>}
      </div>
      <div className={classes.userGoalData}>
        <label>
          今日已達成
          <div>
            <PersonNumberMotion targetNumber={dayCompleteNum} />
            個目標
          </div>
        </label>
        <label>
          這個月已達成
          <div>
            <PersonNumberMotion targetNumber={monthCompleteNum} />
            個目標
          </div>
        </label>
        <label>
          今年已達成
          <div>
            <PersonNumberMotion targetNumber={yearCompleteNum} />
            個目標
          </div>
        </label>
      </div>
    </div>
  );
}
