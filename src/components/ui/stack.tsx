"use client";

import { CSSProperties, HTMLAttributes } from "react";
import styles from "./layout.module.css";
import { cn } from "./cn";

export type StackDirection = "column" | "row";

export type StackProps = HTMLAttributes<HTMLDivElement> & {
  direction?: StackDirection;
  gap?: number;
  wrap?: boolean;
  align?: CSSProperties["alignItems"];
  justify?: CSSProperties["justifyContent"];
};

export function Stack({
  direction = "column",
  gap = 12,
  wrap,
  align,
  justify,
  className,
  style,
  ...props
}: StackProps) {
  return (
    <div
      className={cn(
        styles.stack,
        direction === "row" && styles.row,
        wrap && styles.wrap,
        className
      )}
      style={
        {
          ...style,
          "--stack-gap": `${gap}px`,
          alignItems: align,
          justifyContent: justify,
        } as CSSProperties
      }
      {...props}
    />
  );
}

