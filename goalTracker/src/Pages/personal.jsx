import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
("use client");
export default function Personal() {
  const { yearCompleteNum, monthCompleteNum, dayCompleteNum } = useLoaderData();

  return (
    <div>
      <div>
        <img></img>
        <p>User XUAN</p>
      </div>
      <div>
        <label>
          今日已達成：<div>{dayCompleteNum}個目標</div>
        </label>
        <label>
          這個月已達成：<div>{monthCompleteNum}個目標</div>
        </label>
        <label>
          今年已達成：<div>{yearCompleteNum}個目標</div>
        </label>
      </div>
    </div>
  );
}
