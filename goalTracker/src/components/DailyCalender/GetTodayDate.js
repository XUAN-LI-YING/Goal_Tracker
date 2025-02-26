export function getTodayDate() {
  const now = new Date();
  console.log("now", now);
  const todayYear = now.getFullYear();
  const todayMonth = now.getMonth() + 1;
  const todayDay = now.getDate();
  return { todayYear, todayMonth, todayDay };
}
