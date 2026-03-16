"use client";

import { HTMLAttributes, ReactNode } from "react";
import styles from "./media.module.css";
import { cn } from "./cn";

export type ImagePreviewProps = HTMLAttributes<HTMLDivElement> & {
  src?: string;
  alt?: string;
  overlay?: ReactNode;
};

export function ImagePreview({
  src,
  alt,
  overlay,
  className,
  ...props
}: ImagePreviewProps) {
  return (
    <div className={cn(styles.imagePreview, className)} {...props}>
      <div className={styles.imagePreviewInner}>
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt ?? ""} />
        ) : null}
        {overlay ? <div className={styles.imageOverlay}>{overlay}</div> : null}
      </div>
    </div>
  );
}

