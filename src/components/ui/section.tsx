"use client";

import { HTMLAttributes, ReactNode } from "react";
import styles from "./layout.module.css";
import { cn } from "./cn";
import { Heading } from "./heading";
import { Text } from "./text";

export type SectionProps = HTMLAttributes<HTMLElement> & {
  title?: ReactNode;
  description?: ReactNode;
};

export function Section({
  title,
  description,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn(styles.section, className)} {...props}>
      {title || description ? (
        <header className={styles.sectionHeader}>
          {title ? <Heading size="md">{title}</Heading> : null}
          {description ? <Text variant="bodySm">{description}</Text> : null}
        </header>
      ) : null}
      {children}
    </section>
  );
}

