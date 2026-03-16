"use client";

import { HTMLAttributes } from "react";
import styles from "./media.module.css";
import { cn } from "./cn";

export type FilePreviewStatus = "idle" | "uploading" | "error" | "done";

export type FilePreviewProps = HTMLAttributes<HTMLDivElement> & {
  name: string;
  sizeLabel?: string;
  status?: FilePreviewStatus;
};

export function FilePreview({
  name,
  sizeLabel,
  status = "idle",
  className,
  ...props
}: FilePreviewProps) {
  const statusText =
    status === "uploading"
      ? "Uploading…"
      : status === "error"
      ? "Failed"
      : status === "done"
      ? "Uploaded"
      : undefined;

  return (
    <div className={cn(styles.filePreview, className)} {...props}>
      <div className={styles.fileIcon} aria-hidden="true">
        📄
      </div>
      <div className={styles.fileMeta}>
        <div className={styles.fileName}>{name}</div>
        <div className={styles.fileSize}>
          {sizeLabel}
          {sizeLabel && statusText ? " • " : ""}
          {statusText}
        </div>
      </div>
    </div>
  );
}

