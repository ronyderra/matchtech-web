"use client";

import { HTMLAttributes } from "react";
import styles from "./form-utilities.module.css";
import { cn } from "./cn";

export type StepConfig = {
  id: string;
  label: string;
};

export type StepperProps = HTMLAttributes<HTMLDivElement> & {
  steps: StepConfig[];
  currentIndex: number;
};

export function Stepper({ steps, currentIndex, className, ...props }: StepperProps) {
  return (
    <div className={cn(styles.stepperRoot, className)} {...props}>
      <div className={styles.stepperTrack} aria-hidden="true">
        {steps.map((step, index) => (
          <span
            key={step.id}
            className={cn(
              styles.stepDot,
              index <= currentIndex && styles.stepDotActive
            )}
          />
        ))}
      </div>
      <div className={styles.stepperLabels}>
        <span>{steps[currentIndex]?.label}</span>
        <span>
          Step {currentIndex + 1} of {steps.length}
        </span>
      </div>
    </div>
  );
}

