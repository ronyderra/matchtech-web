"use client";

import { HTMLAttributes, ReactNode } from "react";
import styles from "./notifications.module.css";
import { cn } from "./cn";

export type AlertStatus = "success" | "error" | "info";

export type AlertProps = HTMLAttributes<HTMLDivElement> & {
  status?: AlertStatus;
  title?: ReactNode;
};

export function Alert({
  status = "info",
  title,
  className,
  children,
  ...props
}: AlertProps) {
  const statusClass =
    status === "success"
      ? styles.alertSuccess
      : status === "error"
      ? styles.alertError
      : styles.alertInfo;

  return (
    <div
      className={cn(styles.alert, statusClass, className)}
      role={status === "error" ? "alert" : "status"}
      {...props}
    >
      {title ? <div className={styles.alertTitle}>{title}</div> : null}
      {children}
    </div>
  );
}

