"use client";

import { HTMLAttributes } from "react";
import styles from "./navigation-2.module.css";
import { cn } from "./cn";

export type SidebarItem = {
  id: string;
  label: string;
};

export type SidebarNavProps = HTMLAttributes<HTMLDivElement> & {
  items: SidebarItem[];
  activeId?: string;
  onSelect?: (id: string) => void;
};

export function SidebarNav({
  items,
  activeId,
  onSelect,
  className,
  ...props
}: SidebarNavProps) {
  return (
    <nav className={cn(styles.sidebar, className)} {...props}>
      <ul className={styles.sidebarList}>
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <li key={item.id}>
              <button
                type="button"
                className={cn(
                  styles.sidebarItem,
                  active && styles.sidebarItemActive
                )}
                onClick={() => onSelect?.(item.id)}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

