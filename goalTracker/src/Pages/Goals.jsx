import MainContent from "../components/Layout/MainContent";
import RightPanel from "../components/Layout/RightPanel";

import classes from "./Goal.module.css";

export default function Goals() {
  return (
    <div className={classes.container}>
      <MainContent />
      <RightPanel />
    </div>
  );
}
