"use client";

import { KeyboardEvent, useRef, useState } from "react";
import styles from "./advanced-inputs.module.css";
import { cn } from "./cn";

export type TagInputProps = {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
  /** Short helper under the field (e.g. keyboard hints) */
  hint?: string;
  className?: string;
};

export function TagInput({ tags, onChange, placeholder, maxTags, hint, className }: TagInputProps) {
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function commitTag(value: string) {
    const trimmed = value.trim().replace(/^,+|,+$/g, "");
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
      return;
    }
    if (event.key === "," && draft.trim()) {
      event.preventDefault();
      commitTag(draft);
      return;
    }
    if (event.key === "Backspace" && !draft && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  }

  return (
    <div className={cn(styles.tagRoot, className)}>
      <div className={styles.tagField} role="group" onClick={() => inputRef.current?.focus()}>
        {tags.map((tag) => (
          <span key={tag} className={styles.tagPill}>
            <span className={styles.tagPillText} title={tag}>
              {tag}
            </span>
            <button
              type="button"
              className={styles.tagPillRemove}
              aria-label={`Remove ${tag}`}
              onClick={(e) => {
                e.stopPropagation();
                onChange(tags.filter((t) => t !== tag));
              }}
            >
              <svg viewBox="0 0 12 12" width={12} height={12} aria-hidden className={styles.tagPillRemoveIcon}>
                <path
                  fill="currentColor"
                  d="M9.5 3.205 8.795 2.5 6 5.295 3.205 2.5l-.705.705L5.295 6 2.5 8.795l.705.705L6 6.705 8.795 9.5l.705-.705L6.705 6 9.5 3.205z"
                />
              </svg>
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          className={styles.tagInputInner}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? placeholder : undefined}
          aria-label={placeholder ?? "Add tags"}
        />
      </div>
      {hint ? <p className={styles.tagHint}>{hint}</p> : null}
    </div>
  );
}
