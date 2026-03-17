import { Header } from "@/components/homepage/Header/Header";
import { Footer } from "@/components/homepage/Footer/Footer";
import { Container, Section, Stack, Heading, Text } from "@/components/ui";

export default function ContactPage() {
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
                    Contact
                  </Heading>
                  <Text as="p" style={{ color: "var(--color-text-secondary)" }}>
                    Want to get in touch, report an issue, or learn more about MatchTech? We’d love to
                    hear from you.
                  </Text>
                  <Text as="p">
                    If you’re reaching out about an account or a specific profile, include a brief
                    description of the issue and any screenshots that help us reproduce it. We’ll reply
                    as soon as we can.
                  </Text>

                  <Heading as="h2" size="md" style={{ color: "var(--color-primary)" }}>
                    Email
                  </Heading>
                  <Text as="p">
                    General inquiries:{" "}
                    <Text as="span" style={{ fontWeight: 600, color: "var(--color-primary)" }}>
                      hello@matchtech.com
                    </Text>
                    <br />
                    Support:{" "}
                    <Text as="span" style={{ fontWeight: 600, color: "var(--color-primary)" }}>
                      support@matchtech.com
                    </Text>
                  </Text>
                  <Text as="p">
                    For press and media requests, please contact{" "}
                    <Text as="span" style={{ fontWeight: 600, color: "var(--color-primary)" }}>
                      press@matchtech.com
                    </Text>
                    .
                  </Text>

                  <Heading as="h2" size="md" style={{ color: "var(--color-primary)" }}>
                    Partnerships
                  </Heading>
                  <Text as="p">
                    If you’re interested in partnering, reach out at{" "}
                    <Text as="span" style={{ fontWeight: 600, color: "var(--color-primary)" }}>
                      partners@matchtech.com
                    </Text>
                    .
                  </Text>
                  <Text as="p">
                    For legal or privacy-related questions, you can also email{" "}
                    <Text as="span" style={{ fontWeight: 600, color: "var(--color-primary)" }}>
                      privacy@matchtech.com
                    </Text>{" "}
                    and we’ll route your message to the right place.
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

