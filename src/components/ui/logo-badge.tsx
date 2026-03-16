"use client";

import { HTMLAttributes, ReactNode } from "react";
import styles from "./media.module.css";
import { cn } from "./cn";

export type LogoBadgeProps = HTMLAttributes<HTMLDivElement> & {
  logo?: ReactNode;
};

export function LogoBadge({ logo, children, className, ...props }: LogoBadgeProps) {
  return (
    <div className={cn(styles.logoBadge, className)} {...props}>
      {logo ? <span style={{ marginRight: 6 }}>{logo}</span> : null}
      <span>{children}</span>
    </div>
  );
}

