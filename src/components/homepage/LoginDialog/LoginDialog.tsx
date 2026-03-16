"use client";

import { useState } from "react";
import { Modal, Stack, Button, Input, FormField } from "@/components/ui";

export type LoginDialogProps = {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  /** Called when user wants to switch to register; parent should close login and open register popup. */
  onOpenRegister?: () => void;
};

export function LoginDialog({ open, onClose, onSuccess, onOpenRegister }: LoginDialogProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }
    setLoading(true);
    // Placeholder: replace with real auth (e.g. signIn from next-auth or your API)
    setTimeout(() => {
      setLoading(false);
      onSuccess?.();
      onClose();
      setEmail("");
      setPassword("");
    }, 600);
  }

  function handleClose() {
    setError(null);
    setEmail("");
    setPassword("");
    onClose();
  }

  return (
    <Modal
      open={open}
      title="Log in"
      description="Enter your email and password to access your account."
      onClose={handleClose}
    >
      <form onSubmit={handleSubmit} noValidate>
        <Stack gap={12} style={{ marginTop: 8 }}>
          <FormField id="login-email" label="Email" required>
            {(props) => (
              <Input
                {...props}
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                invalid={!!error}
                aria-invalid={!!error}
              />
            )}
          </FormField>
          <FormField id="login-password" label="Password" required>
            {(props) => (
              <Input
                {...props}
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                invalid={!!error}
                aria-invalid={!!error}
              />
            )}
          </FormField>
          {error && (
            <p role="alert" style={{ fontSize: 13, color: "var(--color-danger)" }}>
              {error}
            </p>
          )}
          <Stack gap={8} style={{ marginTop: 4 }}>
            <Button type="submit" fullWidth disabled={loading}>
              {loading ? "Signing in…" : "Log in"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              fullWidth
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </Button>
          </Stack>
          {onOpenRegister && (
            <p style={{ fontSize: 13, color: "var(--color-text-muted)", margin: 0, textAlign: "center" }}>
              If you don&apos;t have an account yet, please{" "}
              <button
                type="button"
                onClick={() => {
                  handleClose();
                  onOpenRegister();
                }}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  font: "inherit",
                  color: "var(--color-primary)",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                register
              </button>
              .
            </p>
          )}
        </Stack>
      </form>
    </Modal>
  );
}
