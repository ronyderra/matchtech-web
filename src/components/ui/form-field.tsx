"use client";

import { ReactNode } from "react";
import styles from "./form.module.css";
import { Label } from "./label";

type FormFieldRenderProps = {
  id: string;
  "aria-describedby"?: string;
  "aria-invalid"?: true;
};

export type FormFieldProps = {
  id: string;
  label: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  children: (controlProps: FormFieldRenderProps) => ReactNode;
};

export function FormField({
  id,
  label,
  hint,
  error,
  required,
  children,
}: FormFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={styles.formField}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>

      {children({
        id,
        "aria-describedby": describedBy,
        "aria-invalid": error ? true : undefined,
      })}

      {hint ? (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      ) : null}

      {error ? (
        <p id={errorId} className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

