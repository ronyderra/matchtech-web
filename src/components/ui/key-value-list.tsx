"use client";

import { HTMLAttributes, ReactNode } from "react";
import styles from "./data-display.module.css";
import { cn } from "./cn";
import { InfoRow } from "./info-row";

export type KeyValue = {
  label: ReactNode;
  value: ReactNode;
};

export type KeyValueListProps = HTMLAttributes<HTMLDivElement> & {
  items: KeyValue[];
  columns?: 1 | 2;
};

export function KeyValueList({
  items,
  columns = 1,
  className,
  style,
  ...props
}: KeyValueListProps) {
  const gridStyle =
    columns === 2
      ? { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 8 }
      : {};

  return (
    <div
      className={cn(styles.keyValueList, className)}
      style={{ ...gridStyle, ...style }}
      {...props}
    >
      {items.map((item, index) => (
        <InfoRow key={index} label={item.label} value={item.value} />
      ))}
    </div>
  );
}

