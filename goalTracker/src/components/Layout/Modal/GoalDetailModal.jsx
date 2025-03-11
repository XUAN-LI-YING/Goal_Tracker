import GoalDetailModalUI from "../../UI/GoalDetailModalUI";
import EditTagForm from "../../EditTag/EditTagForm";
import GoalDetail from "../../Goal/GoalDetail";
//Redux
import { useSelector } from "react-redux";
import { Detail_MODAL_CONTENT_ELEMENT } from "../../../Store/GoalDetailModalSlice";
//Animation
import { AnimatePresence } from "framer-motion";

export function GoalDetailModal() {
  const isOpen = useSelector((state) => state.GoalDetailModalReducer.isOpen);

  const displayElement = useSelector(
    (state) => state.GoalDetailModalReducer.displayElement
  );
  const availableTags = useSelector((state) => state.GetTags.tags);

  // if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <GoalDetailModalUI>
          {displayElement === Detail_MODAL_CONTENT_ELEMENT.EDIT_GOAL ? (
            <GoalDetail />
          ) : (
            <EditTagForm availableTags={availableTags} prev={"editGoal"} />
          )}
        </GoalDetailModalUI>
      )}
    </AnimatePresence>
  );
}
