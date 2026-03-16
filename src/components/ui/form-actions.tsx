"use client";

import { HTMLAttributes, ReactNode } from "react";
import styles from "./form-utilities.module.css";
import { cn } from "./cn";

export type FormActionsProps = HTMLAttributes<HTMLDivElement> & {
  primary?: ReactNode;
  secondary?: ReactNode;
};

export function FormActions({
  primary,
  secondary,
  className,
  children,
  ...props
}: FormActionsProps) {
  return (
    <div className={cn(styles.formActions, className)} {...props}>
      {children ?? (
        <>
          {secondary}
          {primary}
        </>
      )}
    </div>
  );
}

