"use client";

import { ReactNode, useState } from "react";
import styles from "./overlays-2.module.css";
import { cn } from "./cn";

export type AccordionItemConfig = {
  id: string;
  title: ReactNode;
  content: ReactNode;
};

export type AccordionProps = {
  items: AccordionItemConfig[];
  defaultOpenId?: string;
  className?: string;
};

export function Accordion({ items, defaultOpenId, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);

  function toggle(id: string) {
    setOpenId((current) => (current === id ? null : id));
  }

  return (
    <div className={cn(styles.accordionRoot, className)}>
      {items.map((item) => {
        const open = item.id === openId;
        return (
          <div key={item.id} className={styles.accordionItem}>
            <button
              type="button"
              className={styles.accordionHeader}
              aria-expanded={open}
              onClick={() => toggle(item.id)}
            >
              <span>{item.title}</span>
              <span aria-hidden="true">{open ? "−" : "+"}</span>
            </button>
            {open && <div className={styles.accordionBody}>{item.content}</div>}
          </div>
        );
      })}
    </div>
  );
}

