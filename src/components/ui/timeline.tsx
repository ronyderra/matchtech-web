"use client";

import { HTMLAttributes, ReactNode } from "react";
import styles from "./data-display.module.css";
import { cn } from "./cn";

export type TimelineItem = {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  meta?: ReactNode;
};

export type TimelineProps = HTMLAttributes<HTMLDivElement> & {
  items: TimelineItem[];
};

export function Timeline({ items, className, ...props }: TimelineProps) {
  return (
    <div className={cn(styles.timeline, className)} {...props}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={item.id} className={styles.timelineItem}>
            <div className={styles.timelineMarker} aria-hidden="true">
              <div className={styles.timelineDot} />
              {!isLast && <div className={styles.timelineLine} />}
            </div>
            <div className={styles.timelineContent}>
              <div className={styles.timelineTitle}>{item.title}</div>
              {item.description ? <div>{item.description}</div> : null}
              {item.meta ? (
                <div className={styles.timelineMeta}>{item.meta}</div>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}

