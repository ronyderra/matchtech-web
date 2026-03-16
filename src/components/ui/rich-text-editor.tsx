"use client";

import { useRef } from "react";
import styles from "./advanced-inputs.module.css";
import { cn } from "./cn";

export type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function RichTextEditor({
  value,
  onChange,
  placeholder,
}: RichTextEditorProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  function exec(command: string) {
    document.execCommand(command, false);
    if (ref.current) {
      onChange(ref.current.innerHTML);
    }
  }

  return (
    <div className={styles.rteRoot}>
      <div className={styles.rteToolbar}>
        <button
          type="button"
          className={styles.rteButton}
          onClick={() => exec("bold")}
        >
          Bold
        </button>
        <button
          type="button"
          className={styles.rteButton}
          onClick={() => exec("italic")}
        >
          Italic
        </button>
        <button
          type="button"
          className={styles.rteButton}
          onClick={() => exec("insertUnorderedList")}
        >
          • List
        </button>
      </div>
      <div
        ref={ref}
        className={cn(styles.rteContent)}
        contentEditable
        dangerouslySetInnerHTML={{ __html: value }}
        data-placeholder={placeholder}
        onInput={() => {
          if (ref.current) {
            onChange(ref.current.innerHTML);
          }
        }}
      />
    </div>
  );
}

