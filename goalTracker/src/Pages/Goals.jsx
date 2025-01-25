// LAYOUT
import MainContent from "../components/Layout/MainContent";
import RightPanel from "../components/Layout/RightPanel";
import AddGoalModal from "../components/Layout/AddGoalModal/AddGoalModal";
// CSS
import classes from "./Goal.module.css";
// REDUX
import { dateStore } from "../components/DailyCalender/Store/DateSlice";
import { Provider } from "react-redux";
import { addGoalModalStore } from "../components/Layout/AddGoalModal/Store/AddGoalModalSlice";

export default function Goals() {
  return (
    <div className={classes.container}>
      <Provider store={addGoalModalStore}>
        <MainContent />
        <AddGoalModal />
      </Provider>
      <Provider store={dateStore}>
        <RightPanel />
      </Provider>
    </div>
  );
}
