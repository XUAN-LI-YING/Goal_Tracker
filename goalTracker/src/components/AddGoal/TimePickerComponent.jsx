import React from "react";

import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

import parse from "date-fns/parse";
import isValid from "date-fns/isValid";
import format from "date-fns/format";

export default function TimePickerComponent({
  name,
  value,
  onChange,
  required,
  disabled
}) {
  ///使用 date-fns 的 parse 將 "HH:mm" 字串轉成 Date 物件
  const parsedValue = value ? parse(value, "HH:mm", new Date()) : null;

  const handleTimeChange = (newValue) => {
    if (!newValue || !isValid(newValue)) return;
    const fakeEvent = {
      target: {
        name,
        value: format(newValue, "HH:mm")
      }
    };
    onChange(fakeEvent);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
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
