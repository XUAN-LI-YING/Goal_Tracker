import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
//Firebase
import {
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc
} from "firebase/firestore";
import { db } from "../FireBase/FireBaseConfig";
import { getDocRefHelper } from "../FireBase/FireBaseRefHelper";
import { getCollectionRefHelper } from "../FireBase/FireBaseRefHelper";

const initialState = {
  tags: []
};

const getTagsSlice = createSlice({
  name: "getTagsSlice",
  initialState,
  reducers: {
    setTags: (state, action) => {
      state.tags = action.payload;
    },
    addTag: (state, action) => {
      if (state.tags.includes(action.payload)) {
        Swal.fire({
          title: "您已經有此標籤",
          html: `您重複加入與「${action.payload}」一樣的標籤<br>請新增一個不一樣的標籤</br>`,
          icon: "warning",
          confirmButtonText: "確定",
          customClass: {
            confirmButton: "swalConfirmBtn"
          }
        });
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
      const tagsCollection = getCollectionRefHelper("tags");

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
      const docRef = await setDoc(getDocRefHelper("tags", newTag), {
        tag: newTag
      });
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
      //注意這裡即使沒有這個路徑也會 alert("刪除成功!");
      await deleteDoc(getDocRefHelper("tags", deleteTag));

      Swal.fire({
        title: "刪除成功",
        icon: "success",
        confirmButtonText: "確定",
        customClass: {
          confirmButton: "swalConfirmBtn"
        }
      });
    } catch (error) {
      console.error("Firestore delete錯誤", error);
      dispatch(getTagsAction.addTag(deleteTag));
      return rejectWithValue(error.message);
    }
  }
);
