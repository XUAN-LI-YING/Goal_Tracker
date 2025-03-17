import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAction } from "../Store/LoginSlice";

export default function Login() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const handleLogin = () => {
    // 移除空格
    const trimmedInput = input.replace(/\s+/g, "");

    if (trimmedInput.length !== 4) {
      alert("請輸入 2 個英文字母 + 2 個中文字（順序不限），例如 a好B你");
      return;
    }

    // 取得英文字母與中文字
    const englishLetters = trimmedInput.match(/[A-Za-z]/g) || [];
    const chineseChars = trimmedInput.match(/\p{Script=Han}/gu) || [];

    // 確保字元類型符合需求
    if (englishLetters.length !== 2 || chineseChars.length !== 2) {
      alert(
        "輸入格式錯誤！請輸入 2 個英文字母 + 2 個中文字（順序不限），例如 a好B你"
      );
      return;
    }

    // 通過驗證，存入 Redux
    dispatch(loginAction.setAccountNum(trimmedInput));
  };

  return (
    <div>
      <div>
        <p>
          我們的網站採用「快速登入」機制，讓你不需要註冊、不需要密碼，立即開始使用。
        </p>
        <p>
          <strong>快速登入：</strong>請輸入
          <strong> 2 個英文字母 + 2 個中文字</strong>（順序不限），例如
          <strong> a好B你</strong>。
        </p>
        <p>📌 如果輸入和上次一樣的代碼，你將登入你的專屬資料。</p>
        <p>📌 如果輸入新的代碼，系統會自動幫你建立新的帳戶，資料也是全新的。</p>
        <p>
          ⚠️
          注意！請記住你的識別碼，因為如果輸入錯了，可能會變成另一個帳號，無法找回舊資料！
        </p>
      </div>
      <h2>請輸入代碼</h2>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value.replace(/\s+/g, ""))}
        placeholder="例如 a好B你"
        maxLength={4}
      />
      <button onClick={handleLogin}>確認登入</button>
    </div>
  );
}
