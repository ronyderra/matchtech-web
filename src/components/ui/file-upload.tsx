"use client";

import { ChangeEvent, DragEvent, useId, useRef, useState } from "react";
import styles from "./advanced-inputs.module.css";

export type FileUploadProps = {
  label?: string;
  description?: string;
  accept?: string;
  multiple?: boolean;
  onFilesSelected: (files: FileList) => void;
};

export function FileUpload({
  label = "Choose a file or drag it here.",
  description = "PDF only. Max 3MB, 5 pages. English.",
  accept,
  multiple,
  onFilesSelected,
}: FileUploadProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files?.length) {
      onFilesSelected(event.target.files);
      event.target.value = "";
    }
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragActive(false);
    if (event.dataTransfer.files?.length) {
      onFilesSelected(event.dataTransfer.files);
    }
  }

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragActive(true);
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>) {
    // Only deactivate when leaving the dropzone (not when hovering children).
    if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;
    setIsDragActive(false);
  }

  return (
    <div className={styles.fileRoot}>
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        style={{ display: "none" }}
      />

      <div
        className={`${styles.fileDrop} ${isDragActive ? styles.fileDropActive : ""}`}
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragOver}
        onDragLeave={handleDragLeave}
        role="button"
        tabIndex={0}
        aria-label={label}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
      >
        <div className={styles.fileDropInner}>
          <svg
            className={styles.fileDropIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 3v10" />
            <path d="M7 8l5 5 5-5" />
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          </svg>
          <div>
            <div className={styles.fileDropText}>{label}</div>
            {description ? <div className={styles.fileDropSubtext}>{description}</div> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

