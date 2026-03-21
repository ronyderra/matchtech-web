"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { getHrPartnersCatalog } from "@/constants/hrPartnersCatalog";
import { HR_PARTNER_IMAGE_EXT } from "@/lib/hrPartnerImage";
import styles from "./HrCompaniesSidebar.module.css";

export function HrCompaniesSidebar() {
  const partners = useMemo(() => getHrPartnersCatalog().slice(0, 4), []);

  return (
    <aside className={styles.root} aria-label="HR and headhunter companies">
      <h2 className={styles.title}>HR &amp; headhunters</h2>
      <p className={styles.hint}>
        Top partner firms recruiting on MatchTech right now.
      </p>
      <ul className={styles.list}>
        {partners.map((p, idx) => (
          <li key={p.name} className={styles.item}>
            <div className={styles.imageWrap}>
              <Image
                src={p.imageUrl ?? "/hr-partners/techmatch-global.svg"}
                alt={`${p.name} — recruiting partner`}
                fill
                className={styles.cardImage}
                sizes="(max-width: 900px) 100vw, 280px"
                unoptimized={HR_PARTNER_IMAGE_EXT === "svg"}
              />
            </div>

            <div className={styles.headRow}>
              <span className={styles.name}>{p.name}</span>
              <span className={styles.badge}>Top {idx + 1}</span>
            </div>

            <p className={styles.tagline}>{p.tagline ?? "Cross-functional recruiting partner"}</p>

            <div className={styles.meta}>
              <span className={styles.metaLabel}>Coverage</span>
              <span className={styles.metaValue}>{p.region ?? "Global"}</span>
            </div>

            <div className={styles.meta}>
              <span className={styles.metaLabel}>Focus</span>
              <span className={styles.metaValue}>{p.tagline ?? "Engineering & product hiring"}</span>
            </div>

            <Link
              href={`/contact?topic=hr-partner&partner=${encodeURIComponent(p.name)}`}
              className={styles.scheduleBtn}
              aria-label={`Schedule an appointment with ${p.name}`}
            >
              <svg
                className={styles.scheduleIcon}
                viewBox="0 0 24 24"
                width={16}
                height={16}
                aria-hidden
              >
                <path
                  fill="currentColor"
                  d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM5 8V6h14v2H5z"
                />
              </svg>
              Schedule appointment
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
