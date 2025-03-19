import { useState, useEffect, useRef } from "react";
import classes from "./LogIn.module.css";
//Redux
import { useDispatch } from "react-redux";
import { createUserIfNotExistsThunk } from "../Store/LoginSlice";
import { dateAction, setCalendarAction } from "../Store/DateSlice";
import { dailyGoalsAction } from "../Store/GetGoalSlice";
import { selectTagAction } from "../Store/SelectTagSlice";
//Router
import { useNavigate } from "react-router-dom";
import { completionsAction } from "../Store/GetCompletionSlice";

export default function Login() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const handleLogin = () => {
    // 移除空格
    const trimmedInput = input.replace(/\s+/g, "");

    if (trimmedInput.length !== 4) {
      alert("請輸入 2 個英文字母 + 2 個中文字，順序不限，例如：a好B你");
      return;
    }

    // 取得英文字母與中文字
    const englishLetters = trimmedInput.match(/[A-Za-z]/g) || [];
    const chineseChars = trimmedInput.match(/\p{Script=Han}/gu) || [];

    // 確保字元類型符合需求
    if (englishLetters.length !== 2 || chineseChars.length !== 2) {
      alert(
        "輸入格式錯誤！請輸入 2 個英文字母 + 2 個中文字，順序不限，例如 a好B你"
      );
      return;
    }
    navigate("/");
    // 通過驗證，存入 Redux
    dispatch(createUserIfNotExistsThunk(trimmedInput));
  };

  useEffect(() => {
    //登出後初始化state
    console.log("ji3u.dkfjdlksfg");
    dispatch(dateAction.initialState());
    dispatch(setCalendarAction.initialState());
    dispatch(completionsAction.initialState());
    dispatch(dailyGoalsAction.initialState());
    dispatch(selectTagAction.initialState());
  }, []);

  return (
    <div className={classes.logInSectoin}>
      <h1>快速登入</h1>
      <div>
        <p className={classes.introduction}>
          ✨我們知道您超忙，還要註冊登入超麻煩！
          <br />
          ✨為了讓您方便，我們的網站採用「
          <span>快速登入</span>
          」機制，讓您不需操作複雜的註冊與登入程序，即可開始使用。
        </p>

        <div>
          <div>
            <h2>✏️請輸入代碼以便快速登入：</h2>
            <p>
              <span>請輸入 2 個英文字母 + 2 個中文字（順序不限）</span>
            </p>
          </div>
          <div className={classes.inputSection}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value.replace(/\s+/g, ""))}
              // placeholder="例如：a好B你"
              maxLength={4}
              onKeyUp={(e) => e.key === "Enter" && handleLogin()}
              tabIndex={0}
            />
            <button onClick={handleLogin}>確認登入</button>
          </div>
        </div>
        <div className={classes.remindSection}>
          <p>📌 如果輸入和上次一樣的代碼，您將登入您的專屬資料。</p>
          <p>
            📌 如果輸入新的代碼，系統會自動幫您建立新的帳戶，資料也會是全新的。
          </p>

          <p>
            <span>
              ⚠️注意！如果您的代碼剛好與其他人相同，可能會進入一個「已有人使用過的環境」！😲
            </span>
          </p>
          <p>👉 請輸入獨特的代碼，確保您的資料都是專屬的！</p>
        </div>
      </div>
    </div>
  );
}
