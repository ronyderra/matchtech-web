"use client";

import { KeyboardEvent, useState } from "react";
import styles from "./advanced-inputs.module.css";
import { cn } from "./cn";
import { Chip } from "./chip";

export type TagInputProps = {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
};

export function TagInput({ tags, onChange, placeholder, maxTags }: TagInputProps) {
  const [draft, setDraft] = useState("");

  function commitTag(value: string) {
    const trimmed = value.trim();
    if (!trimmed) return;
    if (maxTags && tags.length >= maxTags) return;
    if (tags.includes(trimmed)) return;
    onChange([...tags, trimmed]);
    setDraft("");
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      commitTag(draft);
    }
    if (event.key === "Backspace" && !draft && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  }

  return (
    <div className={styles.tagRoot}>
      <div className={styles.tagField}>
        {tags.map((tag) => (
          <Chip key={tag}>
            {tag}
            <button
              type="button"
              className={styles.tagChipRemove}
              aria-label={`Remove ${tag}`}
              onClick={() => onChange(tags.filter((t) => t !== tag))}
            >
              ✕
            </button>
          </Chip>
        ))}
        <input
          className={styles.tagInputInner}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? placeholder : undefined}
        />
      </div>
    </div>
  );
}

