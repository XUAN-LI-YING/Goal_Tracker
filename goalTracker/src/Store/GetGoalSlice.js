import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { completionsAction } from "./GetCompletionSlice";
//Firebase
import { db } from "../FireBase/FireBaseConfig";
import { getCollectionRefHelper } from "../FireBase/FireBaseRefHelper";

import {
  setDoc,
  doc,
  collection,
  getDocs,
  updateDoc,
  increment,
  deleteDoc
} from "firebase/firestore";

const dailyGoalsSlice = createSlice({
  name: "dailyGoalsSlice",
  initialState: {
    dailyGoals: [],
    noTimeGoal: [],
    sortGoalTime: []
  },
  reducers: {
    setGoalForTheDay: (state, action) => {
      state.dailyGoals = action.payload;
    },
    addGoalForTheDay: (state, action) => {
      state.dailyGoals.push(action.payload);
    },
    removeGoalForTheDay: (state, action) => {
      state.dailyGoals = state.dailyGoals.filter(
        (goal) => goal.id !== action.payload
      );
    },
    editGoal: (state, action) => {
      const index = state.dailyGoals.findIndex(
        (goal) => goal.id === action.payload.id
      );
      if (index !== -1) {
        state.dailyGoals[index] = action.payload;
      } else {
        alert("找不到該目標，因此無法修改該目標");
      }
    },
    completeGoal: (state, action) => {
      const index = state.dailyGoals.findIndex(
        (goal) => goal.id === action.payload.id
      );
      if (index !== -1) {
        state.dailyGoals[index].isComplete = action.payload.isComplete;
      } else {
        alert("找不到該目標，因此無法修改該目標");
      }
    },
    setNoTimeGoal: (state, action) => {
      state.noTimeGoal = action.payload;
    },
    setSortGoalTime: (state, action) => {
      state.sortGoalTime = action.payload;
    }
  }
});

export const dailyGoalsAction = dailyGoalsSlice.actions;
export const dailyGoalsReducer = dailyGoalsSlice.reducer;

//Post  goal to database
export const postGoalThunk = createAsyncThunk(
  "dailyGoalsSlice/postGoalThunk",
  async ({ year, month, day, newGoal }, { dispatch, rejectWithValue }) => {
    //generate docID first in order to  store on redux state immediately

    const collectionRef = getCollectionRefHelper(
      "goals",
      "dailyDay",
      `${year}`,
      `${month}`,
      `${year}-${month}-${day}`
    );

    const newDocRef = doc(collectionRef);
    newGoal = { ...newGoal, id: newDocRef.id };
    dispatch(dailyGoalsAction.addGoalForTheDay(newGoal));
    try {
      await setDoc(newDocRef, newGoal);
      alert("新增成功");
    } catch (error) {
      console.error("Firestore post錯誤:", error);
      dispatch(dailyGoalsAction.removeGoalForTheDay(newGoal));
      alert("無法提交goal資料");
      return rejectWithValue(error.message);
    }
  }
);

//get data from fatabase

export const getGoalThunk = createAsyncThunk(
  "dailyGoalsSlice/getGoalThunk",
  async ({ year, month, day }, { dispatch, rejectWithValue }) => {
    const collectionRef = collection(
      db,
      "users",
      "userxuan",
      "goals",
      "dailyDay",
      `${year}`,
      `${month}`,
      `${year}-${month}-${day}`
    );

    try {
      const querySnapshot = await getDocs(collectionRef);
      const allGoalsArray = querySnapshot.docs.map((goal) => goal.data());
      console.log("allGoalsArray", allGoalsArray);
      dispatch(dailyGoalsAction.setGoalForTheDay(allGoalsArray));
    } catch (error) {
      console.error("Firestore post錯誤:", error);

      alert("無法讀取goals資料");
      return rejectWithValue(error.message);
    }
  }
);

//edit goal to database
//使用updateDoc()發現沒有該文建會抱錯
export const editGoalThunk = createAsyncThunk(
  "dailyGoalsSlice/editGoalThunk",
  async (
    { year, month, day, newGoal, originalGoal },
    { dispatch, rejectWithValue }
  ) => {
    const docRef = doc(
      db,
      "users",
      "userxuan",
      "goals",
      "dailyDay",
      `${year}`,
      `${month}`,
      `${year}-${month}-${day}`,
      `${newGoal.id}`
    );

    dispatch(dailyGoalsAction.editGoal(newGoal));
    try {
      await updateDoc(docRef, newGoal);
      alert("更新成功");
    } catch (error) {
      dispatch(dailyGoalsAction.editGoal(originalGoal));
      console.error("Firestore post錯誤:", error);
      alert("無法更新goal資料");
      return rejectWithValue(error.message);
    }
  }
);

//Change the goal to complete or incomplete
export const completeGoalThunk = createAsyncThunk(
  "dailyGoalsSlice/completeGoalThunk",
  async (
    { year, month, day, id, isComplete },
    { dispatch, rejectWithValue }
  ) => {
    //該日該項任務轉為完成或未完成
    dispatch(dailyGoalsAction.completeGoal({ id, isComplete }));

    //用redux管理該日完成的任務數量
    if (isComplete) {
      console.log("isComplete", isComplete);
      dispatch(completionsAction.plusDailyCompletions());
    } else {
      console.log("isComplete", isComplete);

      dispatch(completionsAction.minusDailyCompletions());
    }
    // 共同擁有的路徑
    const getDocRef = (...pathSegments) =>
      doc(db, "users", "userxuan", ...pathSegments);

    const docGoalRef = getDocRef(
      "goals",
      "dailyDay",
      `${year}`,
      `${month}`,
      `${year}-${month}-${day}`,
      `${id}`
    );
    const yearRef = getDocRef("completionStats", `${year}`);
    const monthRef = getDocRef(
      "completionStats",
      `${year}`,
      "months",
      `${month}`
    );
    const dayRef = getDocRef(
      "completionStats",
      `${year}`,
      "months",
      `${month}`,
      "days",
      `${year}_${month}_${day}`
    );

    //update isComplete in goal
    try {
      await updateDoc(docGoalRef, { isComplete });
    } catch (error) {
      console.error("Firestore post錯誤:", error);
      alert("無法更新goal isComplet資料,已回復原始狀態");
      //回滾redux狀態
      dispatch(dailyGoalsAction.completeGoal({ id, isComplete: !isComplete }));
      if (isComplete) {
        dispatch(completionsAction.minusDailyCompletions());
      } else {
        dispatch(completionsAction.plusDailyCompletions());
      }
      //
      return rejectWithValue(error.message);
    }

    //Update the number of completed goals
    try {
      const incrementValue = isComplete ? 1 : -1;
      await Promise.all([
        setDoc(
          yearRef,
          { completeNum: increment(incrementValue) },
          { merge: true }
        ),
        setDoc(
          monthRef,
          { completeNum: increment(incrementValue) },
          { merge: true }
        ),
        setDoc(
          dayRef,
          { completeNum: increment(incrementValue) },
          { merge: true }
        )
      ]);
    } catch (error) {
      console.error("Firestore post錯誤:", error);

      alert("更新完成數據失敗，已回復原始狀態");
      // 回滾狀態
      dispatch(dailyGoalsAction.completeGoal({ id, isComplete: !isComplete }));
      if (isComplete) {
        dispatch(completionsAction.minusDailyCompletions());
      } else {
        dispatch(completionsAction.plusDailyCompletions());
      }
      await updateDoc(docGoalRef, { isComplete: !isComplete });
      //
      return rejectWithValue(error.message);
    }
  }
);

//Delete goal
export const deleteGoalThunk = createAsyncThunk(
  "dailyGoalsSlice/deleteGoalThunk",
  async ({ year, month, day, id }, { dispatch, rejectWithValue }) => {
    console.log("1");
    const docRef = doc(
      db,
      "users",
      "userxuan",
      "goals",
      "dailyDay",
      `${year}`,
      `${month}`,
      `${year}-${month}-${day}`,
      `${id}`
    );
    dispatch(dailyGoalsAction.removeGoalForTheDay(id));
    try {
      await deleteDoc(docRef);
      alert("刪除成功");
    } catch (error) {
      console.error("Firestore post錯誤:", error);
      alert("無法刪除goals");
      //回滾redux待補
      return rejectWithValue(error.message);
    }
  }
);
