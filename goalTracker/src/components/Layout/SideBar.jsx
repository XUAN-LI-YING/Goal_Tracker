import classes from "./SideBar.module.css";
// React Router
import { Link } from "react-router-dom";

// Redux
import { useDispatch } from "react-redux";
import { ModalAction } from "../Store/ModalSlice";

export default function SideBar() {
  // Open Add Tag Modal Redux
  const dispatch = useDispatch();
  function openModal() {
    dispatch(ModalAction.openModal());
    dispatch(ModalAction.displayElement("createTag"));
  }

  return (
    <div className={classes.leftSidebar}>
      <Link to="/home">
        <button>Home</button>
      </Link>
      <Link to="/personal">
        <button>
          <img src="user-avatar.jpg" alt="User Avatar" />
          <span>John Doe</span>
        </button>
      </Link>
      <Link to="/">
        <button>Goal</button>
      </Link>
      <div className={classes.tagSection}>
        <ul>
          {/* map.. */}
          <li>
            <label>
              <input type="checkbox" />

              <span>
                <span>📚</span>閱讀一本書
              </span>
            </label>
          </li>
        </ul>
        <button onClick={openModal}>+</button>
      </div>
      <button>Logout</button>
    </div>
  );
}
