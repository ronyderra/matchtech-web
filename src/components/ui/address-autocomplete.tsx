"use client";

import { ChangeEvent, useState } from "react";
import styles from "./advanced-inputs.module.css";
import { SearchInput } from "./search-input";

export type AddressSuggestion = {
  id: string;
  label: string;
};

export type AddressAutocompleteProps = {
  value: string;
  onChange: (value: string) => void;
  suggestions: AddressSuggestion[];
  onQueryChange?: (query: string) => void;
  placeholder?: string;
};

export function AddressAutocomplete({
  value,
  onChange,
  suggestions,
  onQueryChange,
  placeholder,
}: AddressAutocompleteProps) {
  const [open, setOpen] = useState(false);

  function handleChange(next: string) {
    onChange(next);
    onQueryChange?.(next);
    setOpen(true);
  }

  function handleSelect(suggestion: AddressSuggestion) {
    onChange(suggestion.label);
    setOpen(false);
  }

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <SearchInput
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        onClear={() => handleChange("")}
      />
      {open && suggestions.length > 0 && (
        <div className={styles.addressList}>
          {suggestions.map((s) => (
            <button
              key={s.id}
              type="button"
              className={styles.addressItem}
              onClick={() => handleSelect(s)}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

