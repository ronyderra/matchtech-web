"use client";

import { useRouter } from "next/navigation";
import { Modal, Stack, Button, Text } from "@/components/ui";

export type RegisterRoleDialogProps = {
  open: boolean;
  onClose: () => void;
  /** Called when user wants to switch to login; parent should close register and open login popup. */
  onOpenLogin?: () => void;
};

export function RegisterRoleDialog({ open, onClose, onOpenLogin }: RegisterRoleDialogProps) {
  const router = useRouter();

  function goTo(path: string) {
    router.push(path);
    onClose();
  }

  return (
    <Modal
      open={open}
      title="How do you want to use MatchTech?"
      description="Choose the option that best describes you."
      onClose={onClose}
    >
      <Stack gap={12} style={{ marginTop: 8 }}>
        <Button
          fullWidth
          onClick={() => goTo("/register/typ/job-seeker")}
          style={{ justifyContent: "space-between" }}
        >
          <span>Register as Talent</span>
        </Button>
        <Button
          fullWidth
          variant="secondary"
          onClick={() => goTo("/register/employer")}
          style={{ justifyContent: "space-between" }}
        >
          <span>Register to Hire Talent</span>
        </Button>
        {onOpenLogin && (
          <p style={{ fontSize: 13, color: "var(--color-text-muted)", margin: 0, textAlign: "center" }}>
            If you already have an account, please{" "}
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenLogin();
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
              log in
            </button>
            .
          </p>
        )}
      </Stack>
    </Modal>
  );
}

