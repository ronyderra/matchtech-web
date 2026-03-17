import { Header } from "@/components/homepage/Header/Header";
import { Footer } from "@/components/homepage/Footer/Footer";
import { Container, Section, Stack, Heading, Text } from "@/components/ui";

export default function PrivacyPolicyPage() {
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
                    Privacy Policy
                  </Heading>
                  <Text as="p" style={{ color: "var(--color-text-secondary)" }}>
                    This Privacy Policy explains how MatchTech handles information. This is a simple
                    placeholder policy for the demo and will be refined before launch.
                  </Text>
                  <Text as="p">
                    In general, we aim to collect only what we need to operate the service, improve the
                    product, and keep the platform safe. We don’t sell personal information.
                  </Text>

                  <Heading as="h2" size="md" style={{ color: "var(--color-primary)" }}>
                    What we collect
                  </Heading>
                  <Text as="p">
                    Information you provide (such as account details and profile information) and basic
                    usage data to operate and improve the product.
                  </Text>
                  <Text as="p">
                    Profile information may include items like role preferences, skills, location, and
                    company details you choose to share. Usage data may include actions taken in the app
                    and device/browser information used for security and troubleshooting.
                  </Text>

                  <Heading as="h2" size="md" style={{ color: "var(--color-primary)" }}>
                    How we use information
                  </Heading>
                  <Text as="p">
                    We use information to provide the service, personalize the experience, maintain
                    security, and communicate important updates.
                  </Text>
                  <Text as="p">
                    We may also use aggregated, de-identified data to understand feature performance and
                    improve matching and onboarding flows. We design these insights to avoid identifying
                    individual users.
                  </Text>

                  <Heading as="h2" size="md" style={{ color: "var(--color-primary)" }}>
                    Contact
                  </Heading>
                  <Text as="p">
                    Questions about privacy can be sent to{" "}
                    <Text as="span" style={{ fontWeight: 600, color: "var(--color-primary)" }}>
                      privacy@matchtech.com
                    </Text>
                    .
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

