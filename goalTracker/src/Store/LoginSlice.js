import { createSlice } from "@reduxjs/toolkit";

// 讀取 Cookie 的函式
const getAccounCookie = () => {
  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("accountNum="))
      ?.split("=")[1] || ""
  );
};

// Redux Slice
const loginSlice = createSlice({
  name: "accountNum",
  initialState: {
    accountNum: getAccounCookie() // 讀取 Cookie
  },
  reducers: {
    setAccountNum: (state, action) => {
      state.accountNum = action.payload;
      document.cookie = `accountNum=${action.payload}; path=/`; // 存到 Cookie
    }
  }
});

export const loginAction = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
