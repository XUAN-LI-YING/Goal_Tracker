// LAYOUT
import MainContent from "../components/Layout/MainContent";
import RightPanel from "../components/Layout/RightPanel";
// CSS
import classes from "./Goal.module.css";
// REDUX
import { dateStore } from "../components/Calender/Store/DateSlice";
import { Provider } from "react-redux";

export default function Goals() {
  return (
    <div className={classes.container}>
      <MainContent />
      <Provider store={dateStore}>
        <RightPanel />
      </Provider>
    </div>
  );
}
