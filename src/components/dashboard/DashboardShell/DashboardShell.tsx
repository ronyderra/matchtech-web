"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import styles from "./DashboardShell.module.css";

type DashboardShellProps = {
  children: ReactNode;
  user: {
    name: string;
    email: string;
    image: string | null;
  };
};

const DESKTOP_NAV_ITEMS = [
  { href: "/dashboard/swipe", label: "Swipe", icon: "swipe" },
  { href: "/dashboard/profile", label: "Profile page", icon: "profile" },
  { href: "/dashboard/matched-companies", label: "Matched Companies", icon: "matches" },
];

const MOBILE_NAV_ITEMS = [
  { href: "/dashboard/matched-companies", label: "Matches", icon: "matches" },
  { href: "/dashboard/swipe", label: "Swipe", icon: "swipe" },
  { href: "/dashboard/profile", label: "Profile", icon: "profile" },
];

type IconName = "swipe" | "profile" | "matches" | "logout";

function NavIcon({ name }: { name: IconName }) {
  if (name === "swipe") {
    return (
      <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
        <path d="M5 12h10M12 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === "profile") {
    return (
      <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
        <circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M4 20c1.8-3.7 5-5.5 8-5.5S18.2 16.3 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "matches") {
    return (
      <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
        <path d="M12 20s-6.5-3.8-8.5-8A5.3 5.3 0 0 1 12 6a5.3 5.3 0 0 1 8.5 6C18.5 16.2 12 20 12 20Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
      <path d="M9 5l-7 7 7 7M2 12h12M13 5h7v14h-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DashboardShell({ children, user }: DashboardShellProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`${styles.shell} ${isCollapsed ? styles.shellCollapsed : ""}`}>
      <aside className={`${styles.sidebar} ${isCollapsed ? styles.sidebarCollapsed : ""}`}>
        <div className={styles.sidebarTop}>
          <div className={styles.logoWrap}>
            <Link href="/" className={styles.logo} aria-label="Go to MatchTech home">
              MatchTech
            </Link>
          </div>
        </div>

        <div className={styles.userRow}>
          {user.image ? (
            <img src={user.image} alt={`${user.name} profile`} className={styles.avatar} />
          ) : (
            <div className={styles.avatarFallback} aria-hidden="true">
              {(user.name || user.email || "U").charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <nav className={styles.nav}>
          {DESKTOP_NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              title={item.label}
              className={`${styles.navLink} ${isActive ? styles.active : ""}`}
            >
              <NavIcon name={item.icon as IconName} />
              {!isCollapsed ? <span className={styles.navText}>{item.label}</span> : null}
            </Link>
            );
          })}
        </nav>

        <div className={styles.bottomActions}>
          <button
            type="button"
            className={styles.collapseBtn}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={() => setIsCollapsed((v) => !v)}
          >
            <span aria-hidden="true">{isCollapsed ? "»" : "«"}</span>
          </button>

          <button
            type="button"
            aria-label="Logout"
            title="Logout"
            className={styles.logoutBtn}
            onClick={() => void signOut({ callbackUrl: "/" })}
          >
            <NavIcon name="logout" />
            {!isCollapsed ? <span className={styles.navText}>Logout</span> : null}
          </button>
        </div>
      </aside>

      <main className={styles.main}>{children}</main>

      <nav className={styles.mobileNav} aria-label="Dashboard navigation">
        {MOBILE_NAV_ITEMS.map((item) => (
          (() => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.mobileNavLink} ${isActive ? styles.mobileActive : ""}`}
          >
            <NavIcon name={item.icon as IconName} />
          </Link>
            );
          })()
        ))}
      </nav>
    </div>
  );
}
