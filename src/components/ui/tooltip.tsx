"use client";

import { HTMLAttributes, ReactNode, useState } from "react";
import styles from "./overlays-2.module.css";
import { cn } from "./cn";

export type TooltipProps = HTMLAttributes<HTMLDivElement> & {
  label: ReactNode;
};

export function Tooltip({ label, children, className, ...props }: TooltipProps) {
  const [open, setOpen] = useState(false);

  return (
    <span
      className={cn(styles.tooltipRoot, className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      {...props}
    >
      {children}
      {open && (
        <span role="tooltip" className={styles.tooltipBubble}>
          {label}
        </span>
      )}
    </span>
  );
}

