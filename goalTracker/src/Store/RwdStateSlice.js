import { createSlice } from "@reduxjs/toolkit";

export const RWD_STATE_ELEMENT = {
  SCREEN_SMALL_THAN_576: "576Screen",
  SCREEN_SMALL_THAN_768: "768Screen",
  SCREEN_SMALL_1200: "1999Screen",
  SCREEN_BIG_THAN_1200: "1200Screen"
};

//設定初始直讓他一開始就偵測到寬度，避免藉由useEffect呼叫設定初始直而出現DOM閃爍

function initialState() {
  if (typeof window !== "undefined") {
    if (window.innerWidth <= 576)
      return RWD_STATE_ELEMENT.SCREEN_SMALL_THAN_576;
    if (window.innerWidth <= 768)
      return RWD_STATE_ELEMENT.SCREEN_SMALL_THAN_768;
    if (window.innerWidth < 1200) return RWD_STATE_ELEMENT.SCREEN_SMALL_1200;
    return RWD_STATE_ELEMENT.SCREEN_BIG_THAN_1200;
  }
  return RWD_STATE_ELEMENT.SCREEN_BIG_THAN_1200;
}

const rwdStateSlice = createSlice({
  name: "rwdStateSlice",
  initialState: {
    // 藉由獲得初始裝置的螢幕寬度來設定初始直
    screenState: initialState()
  },
  reducers: {
    currentScreen: (state, action) => {
      state.screenState = action.payload;
      console.log(" state.screenState", state.screenState);
    }
  }
});

export const rwdStateSliceAction = rwdStateSlice.actions;
export const rwdStateSliceReducer = rwdStateSlice.reducer;
