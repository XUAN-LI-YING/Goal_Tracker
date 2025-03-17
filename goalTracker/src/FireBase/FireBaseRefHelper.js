import { doc, collection } from "firebase/firestore";
import { db } from "./FireBaseConfig";

const getAccounCookie = () => {
  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("accountNum="))
      ?.split("=")[1] || ""
  );
};

export const getDocRefHelper = (...pathSegments) => {
  // 讀取 sessionStorage
  const accountNum = getAccounCookie();
  if (!accountNum) {
    throw new Error("未登入");
  }

  return doc(db, "users", accountNum, ...pathSegments);
};

export const getCollectionRefHelper = (...pathSegments) => {
  // 讀取 sessionStorage
  const accountNum = getAccounCookie();
  if (!accountNum) {
    throw new Error("未登入");
  }
  return collection(db, "users", accountNum, ...pathSegments);
};
