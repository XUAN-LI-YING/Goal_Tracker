import GoalDetailModalUI from "../../UI/GoalDetailModalUI";
import { GoalDetail } from "../../Goal/GoalDetail";
//Redux
import { useSelector } from "react-redux";

export function GoalDetailModal() {
  const isOpen = useSelector((state) => state.GoalDetailModalReducer.isOpen);

  if (!isOpen) return null;

  return (
    <GoalDetailModalUI>
      <GoalDetail />
    </GoalDetailModalUI>
  );
}
