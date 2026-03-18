"use client";

import { useState, useEffect } from "react";
import styles from "./file-list-preview.module.css";

function DocumentIcon() {
  return (
    <svg
      width="48"
      height="56"
      viewBox="0 0 48 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={styles.docIcon}
    >
      <path
        d="M8 0h24l16 16v40H8V0z"
        fill="currentColor"
        fillOpacity="0.08"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M32 0v16h16" fill="currentColor" fillOpacity="0.2" />
      <path
        d="M14 28h20M14 36h14M14 44h16"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg
      width="48"
      height="56"
      viewBox="0 0 48 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={styles.docIcon}
    >
      <rect
        x="4"
        y="4"
        width="40"
        height="48"
        rx="4"
        fill="currentColor"
        fillOpacity="0.08"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="18" cy="22" r="6" fill="currentColor" fillOpacity="0.3" />
      <path
        d="M4 44l12-12 8 8 12-16 8 8v12H4V44z"
        fill="currentColor"
        fillOpacity="0.3"
      />
    </svg>
  );
}

export type FileListPreviewProps = {
  files: File[];
  /** 'document' = doc icon for all; 'image' = thumbnail for image files, doc icon for others */
  variant?: "document" | "image";
  /** When provided, each file shows a remove button that calls this with (file, index) */
  onRemove?: (file: File, index: number) => void;
};

export function FileListPreview({ files, variant = "document", onRemove }: FileListPreviewProps) {
  if (files.length === 0) return null;

  return (
    <div className={styles.root}>
      {files.map((file, index) => (
        <FileItem
          key={`${file.name}-${file.size}-${index}`}
          file={file}
          variant={variant}
          index={index}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}

function FileItem({
  file,
  variant,
  index,
  onRemove,
}: {
  file: File;
  variant: "document" | "image";
  index: number;
  onRemove?: (file: File, index: number) => void;
}) {
  const isImage = file.type.startsWith("image/");
  const [thumbUrl, setThumbUrl] = useState<string | null>(null);

  useEffect(() => {
    if (variant !== "image" || !isImage) return;
    const url = URL.createObjectURL(file);
    queueMicrotask(() => setThumbUrl(url));
    return () => URL.revokeObjectURL(url);
  }, [file, variant, isImage]);

  return (
    <div className={styles.item}>
      {onRemove && (
        <button
          type="button"
          onClick={() => onRemove(file, index)}
          className={styles.removeBtn}
          aria-label={`Remove ${file.name}`}
          title="Remove file"
        >
          <span aria-hidden>×</span>
        </button>
      )}
      <div className={styles.iconWrap}>
        {variant === "image" && thumbUrl ? (
          <img
            src={thumbUrl}
            alt={`Preview thumbnail: ${file.name}`}
            className={styles.thumb}
            width={56}
            height={56}
          />
        ) : (
          isImage ? <ImageIcon /> : <DocumentIcon />
        )}
      </div>
      <span className={styles.name} title={file.name}>
        {file.name}
      </span>
    </div>
  );
}
