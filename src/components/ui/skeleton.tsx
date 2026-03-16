"use client";

import { CSSProperties, HTMLAttributes } from "react";
import styles from "./surface.module.css";
import { cn } from "./cn";

export type SkeletonVariant = "rect" | "circle";

export type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
  width?: number | string;
  height?: number | string;
  variant?: SkeletonVariant;
};

export function Skeleton({
  width = "100%",
  height = 16,
  variant = "rect",
  className,
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        styles.skeleton,
        variant === "circle" && styles.skeletonCircle,
        className
      )}
      style={
        {
          ...style,
          width,
          height,
        } as CSSProperties
      }
      aria-hidden="true"
      {...props}
    />
  );
}

