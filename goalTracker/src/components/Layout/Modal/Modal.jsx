//Component
import ModalUI from "../../UI/ModalUI";
import { AddGoalForm } from "../../AddGoal/AddGoalForm";
import { EditTagForm } from "../../EditTag/EditTagForm";

//Redux
import { useSelector } from "react-redux";
import { MODAL_CONTENT_ELEMENT } from "../../Store/ModalSlice";

export default function AddGoalModal() {
  // openGoalModalState
  const isOpen = useSelector((state) => state.Modal.isOpen);
  const displayElement = useSelector((state) => state.Modal.displayElement);

  if (!isOpen) return null;

  return (
    <ModalUI>
      {displayElement === MODAL_CONTENT_ELEMENT.ADD_GOAL ? (
        <AddGoalForm />
      ) : (
        <EditTagForm />
      )}
    </ModalUI>
  );
}
