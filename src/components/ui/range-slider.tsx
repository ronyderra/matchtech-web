"use client";

import { ChangeEvent } from "react";
import styles from "./advanced-inputs.module.css";
import { cn } from "./cn";

export type RangeSliderProps = {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  label?: string;
  formatValue?: (value: number) => string;
};

export function RangeSlider({
  min,
  max,
  step = 1,
  value,
  onChange,
  label,
  formatValue,
}: RangeSliderProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(Number(event.target.value));
  }

  const display = formatValue ? formatValue(value) : `${value}`;

  return (
    <div className={styles.rangeRoot}>
      {label ? <span className={styles.rangeValue}>{label}</span> : null}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
      />
      <span className={styles.rangeValue}>{display}</span>
    </div>
  );
}

