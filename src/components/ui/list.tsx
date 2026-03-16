"use client";

import { HTMLAttributes, ReactNode } from "react";
import styles from "./data-display.module.css";
import { cn } from "./cn";

export type ListProps = HTMLAttributes<HTMLDivElement>;

export function List({ className, ...props }: ListProps) {
  return <div className={cn(styles.listRoot, className)} {...props} />;
}

export type ListItemProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function ListItem({ className, ...props }: ListItemProps) {
  return <div className={cn(styles.listItem, className)} {...props} />;
}

