// LAYOUT
import MainContent from "../components/Layout/MainContent";
import RightPanel from "../components/Layout/RightPanel";
import Modal from "../components/Layout/Modal/Modal";
// CSS
import classes from "./Goal.module.css";
// REDUX
import { useDispatch } from "react-redux";
import { getAllTagsThunk } from "../components/Store/GetTagsSlice";
//REACT
import { useEffect } from "react";
export default function Goals() {
  //get alls database tags by redux thunk and store in redux.The tags will use in Modal component.
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTagsThunk());
  }, []);

  return (
    <div className={classes.container}>
      {/* <Provider store={store}> */}
      <MainContent />
      <Modal />
      <RightPanel />
      {/* </Provider> */}
    </div>
  );
}
