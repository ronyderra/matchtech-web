"use client";

import { HTMLAttributes } from "react";
import styles from "./surface.module.css";
import { cn } from "./cn";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  padded?: boolean;
};

export function Card({ padded = true, className, ...props }: CardProps) {
  return (
    <div
      className={cn(styles.card, padded && styles.cardPadding, className)}
      {...props}
    />
  );
}

export type CardSectionProps = HTMLAttributes<HTMLDivElement>;

export function CardHeader({ className, ...props }: CardSectionProps) {
  return <div className={cn(styles.cardHeader, className)} {...props} />;
}

export function CardBody({ className, ...props }: CardSectionProps) {
  return <div className={cn(styles.cardBody, className)} {...props} />;
}

export function CardFooter({ className, ...props }: CardSectionProps) {
  return <div className={cn(styles.cardFooter, className)} {...props} />;
}

