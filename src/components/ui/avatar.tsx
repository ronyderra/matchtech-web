"use client";

import { ImgHTMLAttributes } from "react";
import styles from "./surface.module.css";
import { cn } from "./cn";

export type AvatarSize = "sm" | "md" | "lg";

export type AvatarProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "children"> & {
  size?: AvatarSize;
  name?: string;
};

function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  const letters = parts.map((p) => p[0]).join("");
  return letters.toUpperCase();
}

export function Avatar({
  size = "md",
  name,
  src,
  alt,
  className,
  ...props
}: AvatarProps) {
  const initials = name ? initialsFromName(name) : "?";
  const sizeClass =
    size === "sm" ? styles.avatarSm : size === "lg" ? styles.avatarLg : styles.avatarMd;

  const resolvedAlt = alt ?? (name ? `${name} avatar` : "Avatar");

  return (
    <span className={cn(styles.avatar, sizeClass, className)}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className={styles.avatarImg} src={src} alt={resolvedAlt} {...props} />
      ) : (
        <span aria-label={resolvedAlt}>{initials}</span>
      )}
    </span>
  );
}

