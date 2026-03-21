"use client";

import { CompanySwipeDeck } from "@/components/dashboard/CompanySwipeDeck/CompanySwipeDeck";
import { HrCompaniesSidebar } from "@/components/dashboard/HrCompaniesSidebar/HrCompaniesSidebar";
import { SwipeFiltersPanel } from "@/components/dashboard/SwipeFiltersPanel/SwipeFiltersPanel";
import styles from "./SwipeBrowseLayout.module.css";

export function SwipeBrowseLayout() {
  return (
    <div className={styles.grid}>
      <SwipeFiltersPanel />
      <div className={styles.center}>
        <CompanySwipeDeck variant="threeColumn" />
      </div>
      <HrCompaniesSidebar />
    </div>
  );
}
