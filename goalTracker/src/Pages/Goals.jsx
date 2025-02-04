// LAYOUT
import MainContent from "../components/Layout/MainContent";
import RightPanel from "../components/Layout/RightPanel";
import Modal from "../components/Layout/Modal/Modal";
// CSS
import classes from "./Goal.module.css";
// REDUX
import { dateStore } from "../components/DailyCalender/Store/DateSlice";
import { Provider } from "react-redux";
import { ModalStore } from "../components/Store/ModalSlice";
export default function Goals() {
  return (
    <div className={classes.container}>
      <Provider store={ModalStore}>
        <MainContent />
        <Modal />
      </Provider>
      <Provider store={dateStore}>
        <RightPanel />
      </Provider>
    </div>
  );
}
