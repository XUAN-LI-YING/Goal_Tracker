import { useState, useEffect } from "react";

//GoalDetail.jsx and AddGoalForm.jsx share this hook
export function useGoalFormHook(initialGoal) {
  //Form value useState
  const [formValue, setFormValue] = useState(initialGoal.goalTextAndTime);

  //the max  lenth of goal title text
  const maxLength = 30;

  //when input change ，go store the change into useState
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormValue((prev) => ({ ...prev, [name]: value }));

    //When "isSetTime" is changed to no, the value of goalTime should also become empty.
    if (name === "isSetTime" && value === "no") {
      setFormValue((prev) => ({ ...prev, goalTime: "" }));
    }
  };

  // Tags handling
  //store selected tags
  const [selectedTags, setSelectedTags] = useState(initialGoal.goalTags);

  const handleTagSelect = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue && !selectedTags.includes(selectedValue)) {
      setSelectedTags((prev) => [...prev, selectedValue]);
      setSelectedTags((prev) => prev.filter((tag) => tag !== "無"));
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove));
  };

  //  if selectedTags is null display no
  useEffect(() => {
    if (selectedTags.length === 0) {
      console.log(123);
      setSelectedTags(["無"]);
    }
  }, [selectedTags]);

  return {
    formValue,
    maxLength,
    handleChange,
    setFormValue,
    selectedTags,
    setSelectedTags,
    handleTagSelect,
    handleRemoveTag
  };
}

export let initialGoal = {
  goalTextAndTime: {},
  goalTags: []
};
