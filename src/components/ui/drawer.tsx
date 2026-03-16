"use client";

import { ReactNode } from "react";
import styles from "./overlays.module.css";
import { Heading } from "./heading";
import { Text } from "./text";
import { Button } from "./button";

export type DrawerSide = "bottom" | "top";

export type DrawerProps = {
  open: boolean;
  side?: DrawerSide;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
};

export function Drawer({
  open,
  side = "bottom",
  title,
  description,
  children,
  primaryActionLabel,
  secondaryActionLabel,
  onPrimaryAction,
  onSecondaryAction,
}: DrawerProps) {
  if (!open) return null;

  const rootClass =
    side === "top"
      ? `${styles.drawerRoot} ${styles.drawerTop}`
      : styles.drawerRoot;

  return (
    <div className={rootClass}>
      <div className={styles.drawerPanel}>
        {(title || description) && (
          <header className={styles.drawerHeader}>
            {title ? (
              <Heading size="md" as="h2">
                {title}
              </Heading>
            ) : null}
            {description ? (
              <Text variant="bodySm">{description}</Text>
            ) : null}
          </header>
        )}

        {children}

        {(primaryActionLabel || secondaryActionLabel) && (
          <div className={styles.drawerActions}>
            {secondaryActionLabel ? (
              <Button
                type="button"
                variant="secondary"
                onClick={onSecondaryAction}
              >
                {secondaryActionLabel}
              </Button>
            ) : null}
            {primaryActionLabel ? (
              <Button type="button" onClick={onPrimaryAction}>
                {primaryActionLabel}
              </Button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

