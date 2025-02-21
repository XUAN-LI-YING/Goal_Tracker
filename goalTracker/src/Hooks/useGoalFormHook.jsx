export function useGoalFormHook(initialGoal) {
  //Form value useState
  const [formValue, setFormValue] = useState(initialGoal);

  const maxLength = 30;
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormValue({ ...formValue, [name]: value });
  };

  return { formValue, maxLength, handleChange };
}
