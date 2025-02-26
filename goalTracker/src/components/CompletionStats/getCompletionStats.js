import { getDoc, doc } from "firebase/firestore";
import { db } from "../../FireBase/FireBaseConfig";
export default async function getCompletionStats(year, month, day) {
  const getDocRef = (...pathSegments) =>
    doc(db, "users", "userxuan", ...pathSegments);
  const yearRef = getDocRef("completionStats", `${year}`);
  const monthRef = getDocRef(
    "completionStats",
    `${year}`,
    "months",
    `${month}`
  );
  const dayRef = getDocRef(
    "completionStats",
    `${year}`,
    "months",
    `${month}`,
    "days",
    `${year}_${month}_${day}`
  );
  try {
    const [yearSnap, monthSnap, daySnap] = await Promise.all([
      getDoc(yearRef),
      getDoc(monthRef),
      getDoc(dayRef)
    ]);
    console.log("yearSnap", yearSnap);
    console.log("yearSnap.data()", yearSnap.data());
    // 提取 completeNum，若文件不存在則預設為 0
    const yearCompleteNum = yearSnap.exists()
      ? yearSnap.data().completeNum || 0
      : 0;
    const monthCompleteNum = monthSnap.exists()
      ? monthSnap.data().completeNum || 0
      : 0;
    const dayCompleteNum = daySnap.exists()
      ? daySnap.data().completeNum || 0
      : 0;
    return { yearCompleteNum, monthCompleteNum, dayCompleteNum };
  } catch (error) {
    console.error("獲取completeNum失敗:", error);
    return {
      yearCompleteNum: "error",
      monthCompleteNum: "error",
      dayCompleteNum: "error"
    };
  }
}
