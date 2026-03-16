"use client";

import { useRouter } from "next/navigation";
import { Modal, Stack, Button, Text } from "@/components/ui";

export type RegisterRoleDialogProps = {
  open: boolean;
  onClose: () => void;
};

export function RegisterRoleDialog({ open, onClose }: RegisterRoleDialogProps) {
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
          onClick={() => goTo("/register/job-seeker")}
          style={{ justifyContent: "space-between" }}
        >
          <span>Register as Talent</span>
          <Text as="span" variant="muted">
            I&apos;m looking for a job
          </Text>
        </Button>
        <Button
          fullWidth
          variant="secondary"
          onClick={() => goTo("/register/employer")}
          style={{ justifyContent: "space-between" }}
        >
          <span>Register to Hire Talent</span>
          <Text as="span" variant="muted">
            I&apos;m hiring for roles
          </Text>
        </Button>
      </Stack>
    </Modal>
  );
}

