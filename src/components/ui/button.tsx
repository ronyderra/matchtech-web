"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./button.module.css";
import { cn } from "./cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  fullWidth,
  loading,
  disabled,
  startIcon,
  endIcon,
  className,
  children,
  ...props
}: ButtonProps) {
  const isDisabled = Boolean(disabled || loading);
  const spinnerIsDark = variant === "secondary" || variant === "ghost";

  return (
    <button
      type="button"
      className={cn(
        styles.button,
        size === "sm" ? styles.sizeSm : styles.sizeMd,
        variant === "primary" && styles.variantPrimary,
        variant === "secondary" && styles.variantSecondary,
        variant === "ghost" && styles.variantGhost,
        variant === "danger" && styles.variantDanger,
        fullWidth && styles.fullWidth,
        className
      )}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <span
          className={cn(styles.spinner, spinnerIsDark && styles.spinnerDark)}
          aria-hidden="true"
        />
      ) : startIcon ? (
        <span aria-hidden="true">{startIcon}</span>
      ) : null}
      <span>{children}</span>
      {!loading && endIcon ? <span aria-hidden="true">{endIcon}</span> : null}
    </button>
  );
}

