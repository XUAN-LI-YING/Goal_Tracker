// LAYOUT
import MainContent from "../components/Layout/MainContent";
import RightPanel from "../components/Layout/RightPanel";
import Modal from "../components/Layout/Modal/Modal";
// CSS
import classes from "./Goal.module.css";
// REDUX
import { useDispatch } from "react-redux";
import { getTagsAction } from "../components/Store/GetTagsSlice";
//React router
import { useLoaderData } from "react-router-dom";

export default function Goals() {
  //get alls database tags by loader function and store in redux.The tags will use in Modal component.
  const dispatch = useDispatch();
  const allTagsArray = useLoaderData();
  dispatch(getTagsAction.setTags(allTagsArray));

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
