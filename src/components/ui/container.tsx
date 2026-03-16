"use client";

import { HTMLAttributes } from "react";
import styles from "./layout.module.css";
import { cn } from "./cn";

export type ContainerProps = HTMLAttributes<HTMLDivElement>;

export function Container({ className, ...props }: ContainerProps) {
  return <div className={cn(styles.container, className)} {...props} />;
}

