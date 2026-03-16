"use client";

import { ComponentPropsWithoutRef, ElementType } from "react";
import styles from "./typography.module.css";
import { cn } from "./cn";

export type TextVariant = "body" | "bodySm" | "muted";
export type TextAlign = "left" | "center" | "right";

export type TextProps<TAs extends ElementType> = {
  as?: TAs;
  variant?: TextVariant;
  align?: TextAlign;
} & Omit<ComponentPropsWithoutRef<TAs>, "as">;

export function Text<TAs extends ElementType = "p">({
  as,
  variant = "body",
  align = "left",
  className,
  ...props
}: TextProps<TAs>) {
  const Comp = (as ?? "p") as ElementType;
  return (
    <Comp
      className={cn(
        styles.text,
        variant === "body" && styles.textBody,
        variant === "bodySm" && styles.textBodySm,
        variant === "muted" && styles.textMuted,
        align === "left" && styles.alignLeft,
        align === "center" && styles.alignCenter,
        align === "right" && styles.alignRight,
        className
      )}
      {...props}
    />
  );
}

