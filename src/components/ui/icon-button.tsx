"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./button.module.css";
import { cn } from "./cn";

export type IconButtonVariant = "default" | "ghost" | "danger";
export type IconButtonSize = "sm" | "md";

export type IconButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  children: ReactNode;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
};

export function IconButton({
  variant = "default",
  size = "md",
  className,
  children,
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        styles.button,
        styles.iconButton,
        size === "sm" && styles.iconButtonSm,
        variant === "ghost" && styles.iconButtonGhost,
        variant === "danger" && styles.iconButtonDanger,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

