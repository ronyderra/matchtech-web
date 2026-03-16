"use client";

import { ReactNode, useEffect } from "react";
import styles from "./overlays.module.css";
import { Heading } from "./heading";
import { Text } from "./text";
import { Button } from "./button";

export type ModalProps = {
  open: boolean;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  onClose?: () => void;
};

export function Modal({
  open,
  title,
  description,
  children,
  primaryActionLabel,
  secondaryActionLabel,
  onPrimaryAction,
  onSecondaryAction,
  onClose,
}: ModalProps) {
  useEffect(() => {
    if (!open || !onClose) return;

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose?.();
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const titleId = title ? "modal-title" : undefined;
  const descriptionId = description ? "modal-description" : undefined;

  return (
    <div
      className={styles.backdrop}
      onClick={onClose}
      aria-hidden={onClose ? undefined : true}
    >
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        onClick={(event) => event.stopPropagation()}
      >
        {(title || description) && (
          <header className={styles.dialogHeader}>
            {title ? (
              <Heading id={titleId} size="md">
                {title}
              </Heading>
            ) : null}
            {description ? (
              <Text id={descriptionId} variant="bodySm">
                {description}
              </Text>
            ) : null}
          </header>
        )}

        {children}

        {(primaryActionLabel || secondaryActionLabel) && (
          <div className={styles.dialogActions}>
            {secondaryActionLabel ? (
              <Button
                type="button"
                variant="secondary"
                onClick={onSecondaryAction ?? onClose}
              >
                {secondaryActionLabel}
              </Button>
            ) : null}
            {primaryActionLabel ? (
              <Button
                type="button"
                onClick={onPrimaryAction}
              >
                {primaryActionLabel}
              </Button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

