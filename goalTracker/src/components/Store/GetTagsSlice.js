import { createSlice } from "@reduxjs/toolkit";

const getTagsSlice = createSlice({
  name: "getTagsSlice",
  initialState: {
    tags: []
  },
  reducers: {
    setTags: (state, action) => {
      state.tags = action.payload;
    },
    addTag: (state, action) => {
      if (state.tags.includes(action.payload)) {
        alert(
          `您已經有此標籤!\n您重複加入與${action.payload}一樣的標籤，請新增一個不一樣的標籤`
        );
      } else {
        state.tags.push(action.payload);
      }
    },
    removeTag: (state, action) => {
      state.tags = state.tags.filter((tag) => tag !== action.payload);
    }
  }
});

export const getTagsAction = getTagsSlice.actions;
export const getTagsReducer = getTagsSlice.reducer;
