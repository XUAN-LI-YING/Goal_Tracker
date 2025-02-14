import { collection, getDocs } from "firebase/firestore";
import { db } from "./FireBaseConfig";

export async function getAllTags() {
  try {
    const tagsCollection = collection(db, "users", "userxuan", "tags");

    const querySnapshot = await getDocs(tagsCollection);

    const allTagArray = querySnapshot.docs.map((tagID) => tagID.data().tag);

    console.log("querySnapshot.docs", querySnapshot.docs);
    console.log("allTagArray", allTagArray);
    return allTagArray;
  } catch (error) {
    console.error("獲取 tags 失敗：", error);
    return ["獲取 tags 失敗"];
  }
}
