"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./advanced-inputs.module.css";
import { cn } from "./cn";
import { Chip } from "./chip";

export type MultiSelectOption = {
  value: string;
  label: string;
};

export type MultiSelectProps = {
  options: MultiSelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  maxSelected?: number;
};

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder,
  maxSelected,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  function toggleOption(optionValue: string) {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      if (maxSelected !== undefined && value.length >= maxSelected) return;
      const next = [...value, optionValue];
      onChange(next);
      if (maxSelected !== undefined && next.length >= maxSelected) {
        setOpen(false);
      }
    }
  }

  const selectedOptions = options.filter((opt) => value.includes(opt.value));

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent | PointerEvent) {
      const root = rootRef.current;
      if (!root) return;
      if (event.target instanceof Node && !root.contains(event.target)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className={styles.multiRoot} ref={rootRef}>
      <div
        className={styles.multiField}
        onClick={() => setOpen((prev) => !prev)}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {selectedOptions.length === 0 ? (
          <span style={{ color: "var(--color-text-muted)", fontSize: "var(--font-size-body-sm)" }}>
            {placeholder}
          </span>
        ) : (
          selectedOptions.map((opt) => (
            <Chip key={opt.value}>{opt.label}</Chip>
          ))
        )}
      </div>
      <div className={styles.multiDropdown}>
        {open && (
          <div className={styles.multiMenu} role="listbox">
            {options.map((opt) => {
              const selected = value.includes(opt.value);
              const disabled =
                !selected && maxSelected !== undefined && value.length >= maxSelected;
              return (
                <button
                  key={opt.value}
                  type="button"
                  className={styles.multiOption}
                  onClick={() => toggleOption(opt.value)}
                  disabled={disabled}
                  aria-disabled={disabled}
                >
                  <span className={cn(disabled && styles.multiOptionDisabled)}>{opt.label}</span>
                  {selected ? <span aria-hidden="true">✓</span> : null}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

