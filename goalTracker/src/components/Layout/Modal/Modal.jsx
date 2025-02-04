//Component
import ModalUI from "../../UI/ModalUI";
import { AddGoalForm } from "../../AddGoal/AddGoalForm";
import CreateTag from "../../CreateTag/CreateTag";
//Redux
import { useSelector } from "react-redux";

export default function AddGoalModal() {
  // openGoalModalState
  const isOpen = useSelector((state) => state.Modal.isOpen);
  const displayElement = useSelector((state) => state.Modal.displayElement);

  if (!isOpen) return null;

  return (
    <ModalUI>
      {displayElement == "addGoal" ? <AddGoalForm /> : <CreateTag />}
    </ModalUI>
  );
}
