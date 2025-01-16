import classes from "./SideBar.module.css";
import { Link } from "react-router-dom";
export default function SideBar() {
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
        <button>+</button>
      </div>
      <button>Logout</button>
    </div>
  );
}
