"use client";

import { Avatar } from "./avatar";
import styles from "./media.module.css";

export type AvatarGroupProps = {
  names: string[];
  maxVisible?: number;
};

export function AvatarGroup({ names, maxVisible = 3 }: AvatarGroupProps) {
  const visible = names.slice(0, maxVisible);
  const overflow = names.length - visible.length;

  return (
    <div className={styles.avatarGroup}>
      {visible.map((name, index) => (
        <span
          key={name + index}
          className={index === 0 ? "" : styles.avatarOverlap}
        >
          <Avatar size="sm" name={name} />
        </span>
      ))}
      {overflow > 0 && (
        <div className={styles.avatarOverflow}>+{overflow}</div>
      )}
    </div>
  );
}

