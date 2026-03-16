"use client";

import { ReactNode } from "react";
import styles from "./form-utilities.module.css";
import { cn } from "./cn";

export type MultiStepFormProps = {
  currentIndex: number;
  totalSteps: number;
  onNext?: () => void;
  onBack?: () => void;
  children: ReactNode;
  className?: string;
};

export function MultiStepForm({
  currentIndex,
  totalSteps,
  onNext,
  onBack,
  children,
  className,
}: MultiStepFormProps) {
  return (
    <div className={cn(styles.multiStepRoot, className)}>
      <div>{children}</div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--font-size-caption)", color: "var(--color-text-muted)" }}>
        <span>
          Step {currentIndex + 1} of {totalSteps}
        </span>
        <span>
          {onBack ? "Back available" : ""} {onNext ? "Next available" : ""}
        </span>
      </div>
    </div>
  );
}

