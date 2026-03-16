"use client";

import { HTMLAttributes, ReactNode, useState } from "react";
import styles from "./overlays-2.module.css";
import { cn } from "./cn";

export type PopoverProps = HTMLAttributes<HTMLDivElement> & {
  trigger: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function Popover({
  trigger,
  open: controlledOpen,
  defaultOpen,
  onOpenChange,
  className,
  children,
  ...props
}: PopoverProps) {
  const [uncontrolled, setUncontrolled] = useState(!!defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolled;

  function toggle() {
    const next = !open;
    if (!isControlled) setUncontrolled(next);
    onOpenChange?.(next);
  }

  return (
    <div className={cn(styles.popoverRoot, className)} {...props}>
      <span onClick={toggle}>{trigger}</span>
      {open && <div className={styles.popoverPanel}>{children}</div>}
    </div>
  );
}

