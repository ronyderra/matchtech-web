"use client";

import { CSSProperties, HTMLAttributes } from "react";
import styles from "./layout.module.css";
import { cn } from "./cn";

export type GridProps = HTMLAttributes<HTMLDivElement> & {
  cols?: number;
  gap?: number;
  stackOnMobile?: boolean;
};

export function Grid({
  cols = 2,
  gap = 12,
  stackOnMobile,
  className,
  style,
  ...props
}: GridProps) {
  return (
    <div
      className={cn(styles.grid, stackOnMobile && styles.stackOnMobile, className)}
      style={
        {
          ...style,
          "--grid-cols": cols,
          "--grid-gap": `${gap}px`,
        } as CSSProperties
      }
      {...props}
    />
  );
}

