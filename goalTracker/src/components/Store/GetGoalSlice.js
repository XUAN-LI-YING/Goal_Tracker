import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//Firebase
import { db } from "../../FireBase/FireBaseConfig";
import { setDoc, doc, collection, getDocs } from "firebase/firestore";

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
        (goal) => goal.id !== action.payload.id
      );
    },
    editGoalForTheDay: (state, action) => {
      const index = state.dailyGoals.findIndex(
        (goal) => goal.id === action.payload.id
      );
      if (index !== -1) {
        state.dailyGoals[index] = action.payload;
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

//Post tags to database
export const postGoalThunk = createAsyncThunk(
  "dailyGoalsSlice/postGoalThunk",
  async ({ year, month, day, newGoal }, { dispatch, rejectWithValue }) => {
    //generate docID first in order to  store on redux state immediately
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

    const newDocRef = doc(collectionRef);
    newGoal = { ...newGoal, id: newDocRef.id };
    dispatch(dailyGoalsAction.addGoalForTheDay(newGoal));
    try {
      await setDoc(newDocRef, newGoal);
      alert("新增成功");
    } catch (error) {
      console.error("Firestore post錯誤:", error);
      dispatch(dailyGoalsAction.removeTag(newGoal));
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
      dispatch(dailyGoalsAction.removeGoalForTheDay(allGoalsArray));
      alert("無法讀取goals資料");
      return rejectWithValue(error.message);
    }
  }
);
