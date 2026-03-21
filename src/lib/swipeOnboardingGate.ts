"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/store";
import type { TalentDetails } from "@/types";

export const SWIPE_ONBOARDING_UPDATED_EVENT = "matchtech:swipe-onboarding-updated";

export function readSwipeOnboardingFromStorage(): {
  cvUploaded: boolean;
  surveyCompleted: boolean;
} {
  if (typeof window === "undefined") {
    return { cvUploaded: false, surveyCompleted: false };
  }
  return {
    cvUploaded: window.localStorage.getItem("onboarding.cvUploaded") === "true",
    surveyCompleted: window.localStorage.getItem("onboarding.surveyCompleted") === "true",
  };
}

export function notifySwipeOnboardingUpdated() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(SWIPE_ONBOARDING_UPDATED_EVENT));
}

export function useSwipeOnboardingGate() {
  const talent = useUserStore((s) => (s.user?.type === "talent" ? (s.user as TalentDetails) : null));
  const [, bump] = useState(0);

  useEffect(() => {
    const sync = () => bump((n) => n + 1);
    sync();
    window.addEventListener(SWIPE_ONBOARDING_UPDATED_EVENT, sync);
    window.addEventListener("focus", sync);
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(SWIPE_ONBOARDING_UPDATED_EVENT, sync);
      window.removeEventListener("focus", sync);
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const fromStorage = readSwipeOnboardingFromStorage();
  const fromProfile = talent?.swipeOnboarding;

  const cvUploaded = fromProfile?.cvUploaded === true || fromStorage.cvUploaded;
  const surveyCompleted = fromProfile?.surveyCompleted === true || fromStorage.surveyCompleted;
  const canSwipe = cvUploaded && surveyCompleted;

  return {
    cvUploaded,
    surveyCompleted,
    canSwipe,
    needsOnboarding: !canSwipe,
  };
}
