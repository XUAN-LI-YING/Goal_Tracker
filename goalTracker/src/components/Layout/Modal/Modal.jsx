//Component
import ModalUI from "../../UI/ModalUI";
import { AddGoalForm } from "../../AddGoal/AddGoalForm";
import EditTagForm from "../../EditTag/EditTagForm";

//Animation
import { AnimatePresence } from "framer-motion";
//Redux
import { useSelector } from "react-redux";
import { MODAL_CONTENT_ELEMENT } from "../../../Store/ModalSlice";

export default function AddGoalModal() {
  // openGoalModalState
  const isOpen = useSelector((state) => state.Modal.isOpen);
  const displayElement = useSelector((state) => state.Modal.displayElement);
  //Get tags,update tags,redux
  const availableTags = useSelector((state) => state.GetTags.tags);

  // if (!isOpen) return null;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <ModalUI>
          {displayElement === MODAL_CONTENT_ELEMENT.ADD_GOAL ? (
            <AddGoalForm availableTags={availableTags} />
          ) : (
            <EditTagForm availableTags={availableTags} prev={"addGoal"} />
          )}
        </ModalUI>
      )}
    </AnimatePresence>
  );
}
