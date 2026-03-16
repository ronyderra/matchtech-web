"use client";

import { useRouter } from "next/navigation";
import { Button, ButtonProps } from "./button";

export type BackButtonProps = Omit<ButtonProps, "onClick"> & {
  onClick?: () => void;
};

export function BackButton({ children = "Back", onClick, ...props }: BackButtonProps) {
  const router = useRouter();

  function handleClick() {
    if (onClick) {
      onClick();
    } else {
      router.back();
    }
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={handleClick}
      {...props}
    >
      ← {children}
    </Button>
  );
}

