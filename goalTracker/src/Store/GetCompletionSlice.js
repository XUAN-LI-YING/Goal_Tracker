//Firebase
import { getDoc } from "firebase/firestore";
import { getDocRefHelper } from "../FireBase/FireBaseRefHelper";

//Rudex
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = { dailyCompletions: 0 };
const completions = createSlice({
  name: "completions",
  initialState,
  reducers: {
    setDailyCompletions(state, action) {
      state.dailyCompletions = action.payload;
    },

    minusDailyCompletions(state) {
      state.dailyCompletions = state.dailyCompletions - 1;
    },
    plusDailyCompletions(state) {
      state.dailyCompletions = state.dailyCompletions + 1;
    },
    initialState(state) {
      return { ...initialState };
    }
  }
});

export const completionsAction = completions.actions;
export const completionsReducer = completions.reducer;

//Get  Completions for the day
export const getDailyCompletionsThunk = createAsyncThunk(
  "getCompletionSlice/getDailyCompletionsThunk",
  async ({ year, month, day }, { dispatch, rejectWithValue }) => {
    const dayRef = getDocRefHelper(
      "completionStats",
      `${year}`,
      "months",
      `${month}`,
      "days",
      `${year}_${month}_${day}`
    );
    try {
      const daySnap = await getDoc(dayRef);

      // 提取 completeNum，若文件不存在則預設為 0
      const dayCompleteNum = daySnap.exists()
        ? daySnap.data().completeNum || 0
        : 0;

      dispatch(completionsAction.setDailyCompletions(dayCompleteNum));

      return dayCompleteNum;
    } catch (error) {
      console.error("獲取completeNum失敗:", error);
      alert("無法getDailyCompletions資料");
      return rejectWithValue(error.message);
    }
  }
);

//Get  year, month, day Completions
export async function getCompletionStats(year, month, day) {
  const accountNum =
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("accountNum="))
      ?.split("=")[1] || "";

  if (!accountNum) {
    // 未登入時直接導向登入頁
    return null;
  }
  const yearRef = getDocRefHelper("completionStats", `${year}`);
  const monthRef = getDocRefHelper(
    "completionStats",
    `${year}`,
    "months",
    `${month}`
  );
  const dayRef = getDocRefHelper(
    "completionStats",
    `${year}`,
    "months",
    `${month}`,
    "days",
    `${year}_${month}_${day}`
  );
  try {
    const [yearSnap, monthSnap, daySnap] = await Promise.all([
      getDoc(yearRef),
      getDoc(monthRef),
      getDoc(dayRef)
    ]);
    console.log("yearSnap", yearSnap);
    console.log("yearSnap.data()", yearSnap.data());
    // 提取 completeNum，若文件不存在則預設為 0
    const yearCompleteNum = yearSnap.exists()
      ? yearSnap.data().completeNum || 0
      : 0;
    const monthCompleteNum = monthSnap.exists()
      ? monthSnap.data().completeNum || 0
      : 0;
    const dayCompleteNum = daySnap.exists()
      ? daySnap.data().completeNum || 0
      : 0;
    return { yearCompleteNum, monthCompleteNum, dayCompleteNum };
  } catch (error) {
    console.error("獲取completeNum失敗:", error);
    return {
      yearCompleteNum: "error",
      monthCompleteNum: "error",
      dayCompleteNum: "error"
    };
  }
}
