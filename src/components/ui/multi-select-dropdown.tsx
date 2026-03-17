"use client";

import { MultiSelect, type MultiSelectOption } from "./multi-select";

export type MultiSelectDropdownOption = MultiSelectOption;

export type MultiSelectDropdownProps = {
  options: MultiSelectDropdownOption[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  maxSelected?: number;
};

/**
 * Dropdown multi-select (separate from chip-based multi-select).
 * Wrapper around `MultiSelect` to make intent explicit at call sites.
 */
export function MultiSelectDropdown(props: MultiSelectDropdownProps) {
  return <MultiSelect {...props} />;
}

