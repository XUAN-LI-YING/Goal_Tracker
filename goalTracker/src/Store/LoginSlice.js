import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../FireBase/FireBaseConfig";
import { postTagThunk } from "./GetTagsSlice";
// 讀取 Cookie 的函式
const getAccounCookie = () => {
  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("accountNum="))
      ?.split("=")[1] || ""
  );
};

//讀取localStorage
const getAccounLocalStorage = () => {
  return localStorage.getItem("accountNum");
};

const initialState = {
  accountNum: getAccounLocalStorage()
};

// Redux Slice
const loginSlice = createSlice({
  name: "accountNum",
  initialState,
  reducers: {
    setAccountNum: (state, action) => {
      state.accountNum = action.payload;
    },
    logOutAccount: (state) => {
      state.accountNum = "";
    }
  }
});

export const loginAction = loginSlice.actions;
export const loginReducer = loginSlice.reducer;

const defaultTag = [
  "❕重要",
  "🙅‍♀️不重要",
  "‼️非常重要",
  "⏰緊急",
  "😴不緊急",
  "😁愉快"
];
//如果是初次登入，則建立新的資料庫並建立預設的tag，如果不是初次登入則是直接登入
export const createUserIfNotExistsThunk = createAsyncThunk(
  "loginSlice/createIfNotExists",
  async (accountNum, { dispatch, rejectWithValue }) => {
    console.log("我執行咯", accountNum);
    try {
      // const userRef = getDocRefHelper(db, "users", accountNum);
      const userRef = doc(db, "users", accountNum);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // 如果文件不存在，建立該文件，並寫入建立時間
        await setDoc(userRef, { createdTime: new Date().toISOString() });

        dispatch(loginAction.setAccountNum(accountNum));
        localStorage.setItem("accountNum", `${accountNum}`);

        // document.cookie = `accountNum=${accountNum}; path=/;`;

        //為剛註冊的用戶建立預設tag
        await Promise.all(defaultTag.map((tag) => dispatch(postTagThunk(tag))));

        alert("您好，恭喜您註冊新的帳號，歡迎使用！😁✨🎉🎈🎊❤️");
      } else {
        dispatch(loginAction.setAccountNum(accountNum));
        localStorage.setItem("accountNum", `${accountNum}`);

        // document.cookie = `accountNum=${accountNum}; path=/;`;
        alert("您好，歡迎回來！😎😁🤓😍");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
