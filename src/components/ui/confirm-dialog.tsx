"use client";

import { ReactNode } from "react";
import styles from "./overlays-2.module.css";
import { Modal } from "./modal";

export type ConfirmDialogProps = {
  open: boolean;
  title: ReactNode;
  description?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Modal
      open={open}
      title={title}
      description={description}
      primaryActionLabel={confirmLabel}
      secondaryActionLabel={cancelLabel}
      onPrimaryAction={onConfirm}
      onSecondaryAction={onCancel}
      onClose={onCancel}
    />
  );
}

