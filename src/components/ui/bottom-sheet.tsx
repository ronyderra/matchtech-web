"use client";

import { HTMLAttributes, ReactNode } from "react";
import styles from "./overlays-2.module.css";
import { cn } from "./cn";

export type BottomSheetProps = HTMLAttributes<HTMLDivElement> & {
  open: boolean;
  onClose?: () => void;
  title?: ReactNode;
};

export function BottomSheet({
  open,
  onClose,
  title,
  className,
  children,
  ...props
}: BottomSheetProps) {
  if (!open) return null;

  return (
    <div className={cn(styles.bottomSheetRoot, className)} {...props}>
      <div className={styles.bottomSheetPanel}>
        <div
          className={styles.bottomSheetHandle}
          aria-hidden="true"
          onClick={onClose}
        />
        {title ? (
          <div
            style={{
              fontSize: "var(--font-size-body)",
              fontWeight: "var(--font-weight-semibold)",
              marginBottom: 6,
            }}
          >
            {title}
          </div>
        ) : null}
        {children}
      </div>
    </div>
  );
}

