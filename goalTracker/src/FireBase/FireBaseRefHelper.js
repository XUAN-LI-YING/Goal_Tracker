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

const getAccounLocalStorage = () => {
  return localStorage.getItem("accountNum");
};

export const getDocRefHelper = (...pathSegments) => {
  // 讀取 sessionStorage
  const accountNum = getAccounLocalStorage();
  if (!accountNum) {
    throw new Error("未登入");
  }

  return doc(db, "users", accountNum, ...pathSegments);
};

export const getCollectionRefHelper = (...pathSegments) => {
  // 讀取 sessionStorage
  const accountNum = getAccounLocalStorage();
  if (!accountNum) {
    throw new Error("未登入");
  }
  return collection(db, "users", accountNum, ...pathSegments);
};
