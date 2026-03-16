"use client";

import { useMemo, useState } from "react";
import styles from "./advanced-inputs.module.css";
import { Input } from "./input";

export type DatePickerProps = {
  value: Date | null;
  onChange: (value: Date | null) => void;
  placeholder?: string;
};

const DAY_MS = 24 * 60 * 60 * 1000;

export function DatePicker({ value, onChange, placeholder }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [monthStart] = useState(() => startOfMonth(new Date()));

  const days = useMemo(() => buildMonthGrid(monthStart), [monthStart]);

  const display = value ? value.toISOString().slice(0, 10) : "";

  function handleSelect(day: Date) {
    onChange(day);
    setOpen(false);
  }

  return (
    <div className={styles.dateRoot}>
      <Input
        readOnly
        value={display}
        placeholder={placeholder}
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className={styles.datePopover}>
          <div className={styles.dateHeader}>
            <span style={{ fontSize: "var(--font-size-body-sm)", fontWeight: 600 }}>
              {monthStart.toLocaleString(undefined, { month: "long", year: "numeric" })}
            </span>
          </div>
          <div className={styles.dateGrid}>
            {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
              <span
                key={d}
                style={{
                  textAlign: "center",
                  fontSize: "var(--font-size-caption)",
                  color: "var(--color-text-muted)",
                }}
              >
                {d}
              </span>
            ))}
            {days.map((day, idx) => {
              if (!day) {
                return <span key={idx} />;
              }
              const isSelected =
                value &&
                value.getFullYear() === day.getFullYear() &&
                value.getMonth() === day.getMonth() &&
                value.getDate() === day.getDate();
              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  className={`${styles.dateDayButton} ${
                    isSelected ? styles.dateDaySelected : ""
                  }`}
                  onClick={() => handleSelect(day)}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function buildMonthGrid(start: Date): Array<Date | null> {
  const days: Array<Date | null> = [];
  const startWeekday = start.getDay();
  for (let i = 0; i < startWeekday; i += 1) {
    days.push(null);
  }
  const current = new Date(start);
  while (current.getMonth() === start.getMonth()) {
    days.push(new Date(current));
    current.setTime(current.getTime() + DAY_MS);
  }
  return days;
}

