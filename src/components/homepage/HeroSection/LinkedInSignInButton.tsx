"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import styles from "./HeroSection.module.css";

export function LinkedInSignInButton() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignIn() {
    try {
      setIsLoading(true);
      await signIn("linkedin", { callbackUrl: "/dashboard" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      type="button"
      className={styles.linkedinButton}
      onClick={() => void handleSignIn()}
      disabled={isLoading}
    >
      <span className={styles.linkedinIcon} aria-hidden="true">
        in
      </span>
      {isLoading ? "Redirecting..." : "Sign in with LinkedIn"}
    </button>
  );
}
