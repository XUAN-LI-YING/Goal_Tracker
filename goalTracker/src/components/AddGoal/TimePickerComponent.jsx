import React from "react";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export default function TimePickerComponent({
  name,
  value,
  onChange,
  required,
  disabled
}) {
  // 加上 plugin 後就能解析 "18:00" 這種僅有時間的字串
  const parsedValue = value ? dayjs(value, "HH:mm", true) : null;

  console.log("parsedValue", parsedValue);

  const handleTimeChange = (newValue) => {
    if (!newValue || !newValue.isValid()) return;
    const fakeEvent = {
      target: {
        name,
        value: newValue.format("HH:mm")
      }
    };
    onChange(fakeEvent);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        ampm={false}
        value={parsedValue}
        onChange={handleTimeChange}
        disabled={disabled}
        slotProps={{
          textField: {
            variant: "outlined",

            sx: {
              // 1) 設定寬度
              width: "7.6rem",
              // 針對 OutlinedInput 做客製化
              "& .MuiOutlinedInput-root": {
                // 初始邊框（避免預設的 fieldset 干擾）
                border: "0.1rem solid var(--border-color)",
                borderRadius: "var(--radius-sm)",
                padding: "var(--spacing-xs)",
                height: "var(--spacing-lg)",
                color: "var(--primary-text)",
                boxSizing: "border-box",

                // 移除預設的 fieldset 樣式
                "& fieldset": {
                  border: "none"
                },

                // 3) focus 時自訂邊框
                "&.Mui-focused": {
                  border: "0.16rem solid var(--border-color)"
                }
              },

              // 讓文字輸入部份 padding 為 0
              "& input": {
                padding: 0
              },

              "& label": {
                color: "var(--primary-text)"
              },
              "& .MuiInputAdornment-root": {
                display: "flex"
              }
            }
          }
        }}
      />

      {/* 隱藏的原生 input，只用於 required 驗證 */}
      <input
        disabled={disabled}
        name={name}
        value={value}
        required={required}
        style={{
          position: "absolute",
          opacity: 0,
          width: " 7.6rem",
          zIndex: -1
        }}
        readOnly={false}
        tabIndex={-1}
        onChange={() => {}}
      />
    </LocalizationProvider>
  );
}
