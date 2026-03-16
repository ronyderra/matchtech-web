"use client";

import { HTMLAttributes, ReactNode } from "react";
import styles from "./notifications.module.css";
import { cn } from "./cn";

export type ToastStatus = "success" | "error" | "info";

export type ToastProps = HTMLAttributes<HTMLDivElement> & {
  open: boolean;
  status?: ToastStatus;
  title?: ReactNode;
  description?: ReactNode;
};

export function Toast({
  open,
  status = "info",
  title,
  description,
  className,
  ...props
}: ToastProps) {
  if (!open) return null;

  const statusClass =
    status === "success"
      ? styles.toastSuccess
      : status === "error"
      ? styles.toastError
      : undefined;

  return (
    <div className={styles.toastRoot}>
      <div
        className={cn(styles.toast, statusClass, className)}
        role="status"
        {...props}
      >
        {title ? <div className={styles.toastTitle}>{title}</div> : null}
        {description ? <div>{description}</div> : null}
      </div>
    </div>
  );
}

