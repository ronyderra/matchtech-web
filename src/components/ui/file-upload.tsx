"use client";

import { ChangeEvent } from "react";
import styles from "./advanced-inputs.module.css";
import { Button } from "./button";

export type FileUploadProps = {
  label?: string;
  description?: string;
  accept?: string;
  multiple?: boolean;
  onFilesSelected: (files: FileList) => void;
};

export function FileUpload({
  label = "Upload files",
  description = "Attach relevant CVs, portfolios, or PDFs.",
  accept,
  multiple,
  onFilesSelected,
}: FileUploadProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      onFilesSelected(event.target.files);
    }
  }

  return (
    <div className={styles.fileRoot}>
      <div className={styles.fileDrop}>
        <div className={styles.fileDropTitle}>{label}</div>
        <div className={styles.fileDropHint}>{description}</div>
      </div>
      <div>
        <input
          id="file-upload-input"
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          style={{ display: "none" }}
        />
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            document.getElementById("file-upload-input")?.click();
          }}
        >
          Browse files
        </Button>
      </div>
    </div>
  );
}

