import { Header } from "@/components/homepage/Header/Header";
import { Footer } from "@/components/homepage/Footer/Footer";
import { Container, Section, Stack, Heading, Text } from "@/components/ui";

export default function AboutUsPage() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: 120 }}>
        <Section style={{ paddingTop: 64, paddingBottom: 64 }}>
          <Container>
            <div
              style={{
                maxWidth: 900,
                margin: "0 auto",
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)",
              }}
            >
              <div style={{ height: 6, background: "var(--color-primary)" }} />
              <div style={{ padding: 28 }}>
                <Stack gap={14} style={{ maxWidth: 860 }}>
                  <Heading as="h1" size="xl">
                    About MatchTech
                  </Heading>
                  <Text as="p" style={{ color: "var(--color-text-secondary)" }}>
                    MatchTech is a swipe-first hiring experience built to make discovery faster for
                    both candidates and companies.
                  </Text>
                  <Text as="p">
                    We believe the first step of hiring should be lightweight: clear profiles,
                    straightforward intent, and an interface that makes it easy to say “yes”, “no”, or
                    “tell me more” without endless back-and-forth.
                  </Text>

                  <Heading as="h2" size="md" style={{ color: "var(--color-primary)" }}>
                    Our mission
                  </Heading>
                  <Text as="p">
                    We’re building a modern platform where talent and opportunity meet quickly, with
                    clear signal, and less friction.
                  </Text>
                  <Text as="p">
                    Our goal is to help candidates spend less time searching and more time having
                    meaningful conversations, while helping teams focus on people who are genuinely
                    interested and aligned with the role.
                  </Text>

                  <Heading as="h2" size="md" style={{ color: "var(--color-primary)" }}>
                    What we’re focusing on
                  </Heading>
                  <Text as="p">
                    A simple matching flow, better profile quality, and a user experience designed for
                    speed on mobile and clarity on desktop.
                  </Text>
                  <Text as="p">
                    As MatchTech evolves, we’ll keep prioritizing transparency, respectful outreach, and
                    tools that improve signal early—so both sides can move confidently to the next step.
                  </Text>
                </Stack>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}

