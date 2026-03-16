"use client";

import { Container, Stack, Button, LogoBadge } from "@/components/ui";

export function Header() {
  return (
    <header>
      <Container>
        <Stack
          direction="row"
          align="center"
          justify="space-between"
          gap={12}
          style={{ paddingTop: 8, paddingBottom: 8 }}
        >
          <LogoBadge logo="💼">MatchTech</LogoBadge>
          <Stack direction="row" gap={8} align="center">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
            <Button size="sm">Get started</Button>
          </Stack>
        </Stack>
      </Container>
    </header>
  );
}

