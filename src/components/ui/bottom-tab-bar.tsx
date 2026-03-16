"use client";

import styles from "./navigation-2.module.css";
import { cn } from "./cn";

export type BottomTab = {
  id: string;
  label: string;
  icon?: string;
};

export type BottomTabBarProps = {
  tabs: BottomTab[];
  activeId: string;
  onChange?: (id: string) => void;
  className?: string;
};

export function BottomTabBar({
  tabs,
  activeId,
  onChange,
  className,
}: BottomTabBarProps) {
  return (
    <nav className={cn(styles.bottomTabBar, className)} aria-label="Bottom tabs">
      <div className={styles.bottomTabList}>
        {tabs.map((tab) => {
          const active = tab.id === activeId;
          return (
            <button
              key={tab.id}
              type="button"
              className={cn(
                styles.bottomTabButton,
                active && styles.bottomTabButtonActive
              )}
              onClick={() => onChange?.(tab.id)}
            >
              {tab.icon ? <span aria-hidden="true">{tab.icon}</span> : null}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

