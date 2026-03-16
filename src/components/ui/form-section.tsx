"use client";

import { HTMLAttributes, ReactNode } from "react";
import styles from "./form-utilities.module.css";
import { Heading } from "./heading";
import { Text } from "./text";
import { cn } from "./cn";

export type FormSectionProps = HTMLAttributes<HTMLDivElement> & {
  title?: ReactNode;
  description?: ReactNode;
};

export function FormSection({
  title,
  description,
  className,
  children,
  ...props
}: FormSectionProps) {
  return (
    <section className={cn(styles.formSection, className)} {...props}>
      {(title || description) && (
        <header className={styles.formSectionHeader}>
          {title ? <Heading size="md">{title}</Heading> : null}
          {description ? (
            <Text variant="bodySm">{description}</Text>
          ) : null}
        </header>
      )}
      {children}
    </section>
  );
}

