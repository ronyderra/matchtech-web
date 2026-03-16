"use client";

import { ReactNode, useState } from "react";
import styles from "./form-utilities.module.css";
import { Button } from "./button";
import { Input } from "./input";
import { TextArea } from "./textarea";

export type InlineEditableFieldProps = {
  label?: ReactNode;
  value: string;
  onSave: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
};

export function InlineEditableField({
  label,
  value,
  onSave,
  placeholder,
  multiline,
}: InlineEditableFieldProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  function handleSave() {
    onSave(draft);
    setEditing(false);
  }

  function handleCancel() {
    setDraft(value);
    setEditing(false);
  }

  return (
    <div className={styles.inlineFieldRoot}>
      {label ? <div className={styles.inlineFieldLabel}>{label}</div> : null}
      {!editing ? (
        <div className={styles.inlineFieldRow}>
          <div className={styles.inlineFieldValue}>
            {value || (
              <span style={{ color: "var(--color-text-muted)" }}>
                {placeholder}
              </span>
            )}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setEditing(true)}
          >
            Edit
          </Button>
        </div>
      ) : (
        <>
          {multiline ? (
            <TextArea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={placeholder}
            />
          ) : (
            <Input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={placeholder}
            />
          )}
          <div className={styles.inlineFieldRow}>
            <Button type="button" size="sm" onClick={handleSave}>
              Save
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

