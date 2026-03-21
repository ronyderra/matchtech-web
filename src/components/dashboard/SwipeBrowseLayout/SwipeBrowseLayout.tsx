"use client";

import { CompanySwipeDeck } from "@/components/dashboard/CompanySwipeDeck/CompanySwipeDeck";
import { HrCompaniesSidebar } from "@/components/dashboard/HrCompaniesSidebar/HrCompaniesSidebar";
import { SwipeOnboardingGateCenter } from "@/components/dashboard/SwipeOnboardingGateCenter/SwipeOnboardingGateCenter";
import { SwipeFiltersPanel } from "@/components/dashboard/SwipeFiltersPanel/SwipeFiltersPanel";
import { useSwipeOnboardingGate } from "@/lib/swipeOnboardingGate";
import styles from "./SwipeBrowseLayout.module.css";

export function SwipeBrowseLayout() {
  const { needsOnboarding } = useSwipeOnboardingGate();

  if (needsOnboarding) {
    return (
      <div className={styles.gateOnly}>
        <SwipeOnboardingGateCenter />
      </div>
    );
  }

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
