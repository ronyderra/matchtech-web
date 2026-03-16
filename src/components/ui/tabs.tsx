"use client";

import { HTMLAttributes } from "react";
import styles from "./navigation.module.css";
import { cn } from "./cn";

export type TabConfig = {
  id: string;
  label: string;
};

export type TabsProps = HTMLAttributes<HTMLDivElement> & {
  tabs: TabConfig[];
  activeId: string;
  onChangeTab?: (id: string) => void;
};

export function Tabs({ tabs, activeId, onChangeTab, className, ...props }: TabsProps) {
  return (
    <div className={cn(styles.tabsRoot, className)} {...props}>
      <div role="tablist" className={styles.tabList}>
        {tabs.map((tab) => {
          const selected = tab.id === activeId;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              className={styles.tabButton}
              onClick={() => onChangeTab?.(tab.id)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

