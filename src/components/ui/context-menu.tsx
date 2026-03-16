"use client";

import { HTMLAttributes, ReactNode, useState } from "react";
import styles from "./overlays-2.module.css";
import { cn } from "./cn";

export type ContextMenuItem = {
  id: string;
  label: string;
};

export type ContextMenuProps = HTMLAttributes<HTMLDivElement> & {
  trigger: ReactNode;
  items: ContextMenuItem[];
  onSelect?: (id: string) => void;
};

export function ContextMenu({
  trigger,
  items,
  onSelect,
  className,
  ...props
}: ContextMenuProps) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);

  function handleContextMenu(event: React.MouseEvent) {
    event.preventDefault();
    setOpen(true);
    setPosition({ x: event.clientX, y: event.clientY });
  }

  function close() {
    setOpen(false);
  }

  return (
    <div className={className} {...props}>
      <span onContextMenu={handleContextMenu}>{trigger}</span>
      {open && position && (
        <div
          className={styles.contextMenu}
          style={{ top: position.y, left: position.x }}
        >
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              className={styles.contextMenuItem}
              onClick={() => {
                onSelect?.(item.id);
                close();
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

