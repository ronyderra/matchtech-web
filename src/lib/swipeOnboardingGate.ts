"use client";

import { useEffect, useState } from "react";

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
  const [state, setState] = useState(readSwipeOnboardingFromStorage);

  useEffect(() => {
    const sync = () => setState(readSwipeOnboardingFromStorage());
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

  const canSwipe = state.cvUploaded && state.surveyCompleted;
  return {
    cvUploaded: state.cvUploaded,
    surveyCompleted: state.surveyCompleted,
    canSwipe,
    needsOnboarding: !canSwipe,
  };
}
