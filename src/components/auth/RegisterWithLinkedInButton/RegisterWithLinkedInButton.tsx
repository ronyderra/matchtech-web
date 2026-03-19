"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import styles from "./RegisterWithLinkedInButton.module.css";

type RegisterWithLinkedInButtonProps = {
  callbackUrl?: string;
  label?: string;
};

export function RegisterWithLinkedInButton({
  callbackUrl = "/dashboard",
  label = "Sign in with LinkedIn",
}: RegisterWithLinkedInButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignIn() {
    try {
      setIsLoading(true);
      await signIn("linkedin", { callbackUrl });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      type="button"
      className={styles.root}
      onClick={() => void handleSignIn()}
      disabled={isLoading}
      aria-label={label}
    >
      <span className={styles.iconTile} aria-hidden="true">
        <span className={styles.iconText}>in</span>
      </span>
      <span className={styles.label}>{isLoading ? "Redirecting..." : label}</span>
    </button>
  );
}
