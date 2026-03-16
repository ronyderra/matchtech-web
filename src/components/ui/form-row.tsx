"use client";

import { CSSProperties, HTMLAttributes } from "react";
import styles from "./form-utilities.module.css";
import { cn } from "./cn";

export type FormRowProps = HTMLAttributes<HTMLDivElement> & {
  columns?: number;
};

export function FormRow({
  columns = 2,
  className,
  style,
  ...props
}: FormRowProps) {
  return (
    <div
      className={cn(styles.formRow, className)}
      style={
        {
          ...style,
          "--form-row-cols": columns,
        } as CSSProperties
      }
      {...props}
    />
  );
}

