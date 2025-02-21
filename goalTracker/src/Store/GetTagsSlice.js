import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//Firebase
import {
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc
} from "firebase/firestore";
import { db } from "../FireBase/FireBaseConfig";

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

//Get all tags from database
export const getAllTagsThunk = createAsyncThunk(
  "getTagsSlice/getAllTags",
  async (__DO_NOT_USE__ActionTypes, { dispatch, rejectWithValue }) => {
    try {
      const tagsCollection = collection(db, "users", "userxuan", "tags");

      const querySnapshot = await getDocs(tagsCollection);

      const allTagsArray = querySnapshot.docs.map((tagID) => tagID.data().tag);

      console.log("allTagArray", allTagsArray);
      dispatch(getTagsAction.setTags(allTagsArray));

      return allTagsArray;
    } catch {
      console.error("Firestore get錯誤:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

//Post tags to database
export const postTagThunk = createAsyncThunk(
  "getTagsSlice/postTag",
  async (newTag, { dispatch, rejectWithValue }) => {
    try {
      const docRef = await setDoc(
        doc(db, "users", "userxuan", "tags", newTag),
        {
          tag: newTag
        }
      );
    } catch (error) {
      console.error("Firestore post錯誤:", error);
      dispatch(getTagsAction.removeTag(newTag));
      return rejectWithValue(error.message);
    }
  }
);

//Delete tags to database
export const deleteTagThunk = createAsyncThunk(
  "getTagsSlice/deleteTag",
  async (deleteTag, { dispatch, rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, "users", "userxuan", "tags", deleteTag));

      alert("刪除成功!");
    } catch (error) {
      console.error("Firestore delete錯誤", error);
      dispatch(getTagsAction.addTag(deleteTag));
      return rejectWithValue(error.message);
    }
  }
);
