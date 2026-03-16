"use client";

import { ComponentPropsWithoutRef, ElementType } from "react";
import styles from "./typography.module.css";
import { cn } from "./cn";

export type HeadingSize = "xl" | "lg" | "md";

export type HeadingProps<TAs extends ElementType> = {
  as?: TAs;
  size?: HeadingSize;
} & Omit<ComponentPropsWithoutRef<TAs>, "as">;

export function Heading<TAs extends ElementType = "h2">({
  as,
  size = "lg",
  className,
  ...props
}: HeadingProps<TAs>) {
  const Comp = (as ?? "h2") as ElementType;
  return (
    <Comp
      className={cn(
        styles.heading,
        size === "xl" && styles.headingXl,
        size === "lg" && styles.headingLg,
        size === "md" && styles.headingMd,
        className
      )}
      {...props}
    />
  );
}

