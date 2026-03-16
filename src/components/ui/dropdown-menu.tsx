"use client";

import { HTMLAttributes, useState } from "react";
import styles from "./navigation.module.css";
import { cn } from "./cn";
import { Button } from "./button";

export type DropdownItem = {
  id: string;
  label: string;
};

export type DropdownMenuProps = HTMLAttributes<HTMLDivElement> & {
  triggerLabel: string;
  items: DropdownItem[];
  onSelectItem?: (id: string) => void;
};

export function DropdownMenu({
  triggerLabel,
  items,
  onSelectItem,
  className,
  ...props
}: DropdownMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn(styles.dropdownRoot, className)} {...props}>
      <Button
        type="button"
        variant="secondary"
        onClick={() => setOpen((prev) => !prev)}
      >
        {triggerLabel}
      </Button>

      {open && (
        <div className={styles.dropdownMenu} role="menu">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              className={styles.dropdownItem}
              role="menuitem"
              onClick={() => {
                onSelectItem?.(item.id);
                setOpen(false);
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

