import { Header } from "@/components/homepage/Header/Header";
import { Footer } from "@/components/homepage/Footer/Footer";
import { Container, Section, Stack, Heading, Text } from "@/components/ui";

export default function TermsOfUsePage() {
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
                    Terms of Use
                  </Heading>
                  <Text as="p" style={{ color: "var(--color-text-secondary)" }}>
                    These Terms of Use govern your access to and use of MatchTech. This page is a
                    simple placeholder and will be updated as MatchTech moves from demo to launch.
                  </Text>
                  <Text as="p">
                    By accessing or using MatchTech, you agree that you understand these terms and will
                    comply with them. If you do not agree, please do not use the service.
                  </Text>

                  <Heading as="h2" size="md" style={{ color: "var(--color-primary)" }}>
                    Using MatchTech
                  </Heading>
                  <Text as="p">
                    You agree to use MatchTech responsibly, follow applicable laws, and avoid misuse
                    of the platform (including attempts to disrupt, scrape, or reverse engineer the
                    service).
                  </Text>
                  <Text as="p">
                    You also agree not to impersonate others, submit spam, or attempt to bypass rate
                    limits or security controls. We may suspend or restrict access if we believe there
                    is misuse or risk to other users.
                  </Text>

                  <Heading as="h2" size="md" style={{ color: "var(--color-primary)" }}>
                    Content and profiles
                  </Heading>
                  <Text as="p">
                    You are responsible for the information you submit. Please keep profiles accurate
                    and respectful. We may remove content that violates these terms or is unlawful.
                  </Text>
                  <Text as="p">
                    MatchTech is a product demo and certain features may be incomplete or change without
                    notice. We do not guarantee matches, responses, interviews, or hiring outcomes.
                  </Text>

                  <Heading as="h2" size="md" style={{ color: "var(--color-primary)" }}>
                    Changes
                  </Heading>
                  <Text as="p">
                    We may update these Terms of Use from time to time. Material updates will be
                    posted on this page.
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

