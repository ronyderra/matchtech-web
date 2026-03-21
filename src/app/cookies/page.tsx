import { Header } from "@/components/homepage/Header/Header";
import { Footer } from "@/components/homepage/Footer/Footer";
import { Container, Section, Stack, Heading, Text } from "@/components/ui";
import { MatchTechStructuredData } from "@/components/seo/MatchTechStructuredData";
import { createPageMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";

const COOKIES_TITLE = "Cookie Policy | MatchTech";
const COOKIES_DESCRIPTION =
  "Learn how MatchTech uses cookies and similar technologies to run the site and improve the experience.";

export const metadata: Metadata = createPageMetadata({
  pathname: "/cookies",
  title: COOKIES_TITLE,
  description: COOKIES_DESCRIPTION,
});

export default function CookiePolicyPage() {
  return (
    <>
      <MatchTechStructuredData
        page="cookies"
        path="/cookies"
        title={COOKIES_TITLE}
        description={COOKIES_DESCRIPTION}
      />
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
                borderRadius: 4,
                overflow: "hidden",
                boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)",
              }}
            >
              <div style={{ height: 6, background: "var(--color-primary)" }} />
              <div style={{ padding: 28 }}>
                <Stack gap={14} style={{ maxWidth: 860 }}>
                  <Heading as="h1" size="xl">
                    Cookie Policy
                  </Heading>
                  <Text as="p" style={{ color: "var(--color-text-secondary)" }}>
                    This Cookie Policy describes how MatchTech uses cookies and similar technologies
                    to run the site and improve the experience for candidates and employers.
                  </Text>
                  <Text as="p">
                    Cookies help us run core features and understand how the site is being used. We use
                    this information to keep MatchTech reliable, secure, and easy to use.
                  </Text>

                  <Heading as="h2" size="md" style={{ color: "var(--color-primary)" }}>
                    What are cookies?
                  </Heading>
                  <Text as="p">
                    Cookies are small text files stored on your device. They help websites remember
                    preferences and understand usage.
                  </Text>
                  <Text as="p">
                    Similar technologies can include local storage, pixels, and SDKs that provide
                    comparable functionality (like remembering session state or measuring performance).
                  </Text>

                  <Heading as="h2" size="md" style={{ color: "var(--color-primary)" }}>
                    How we use cookies
                  </Heading>
                  <Text as="p">
                    We may use cookies to keep you signed in, remember preferences, and improve site
                    performance and reliability.
                  </Text>
                  <Text as="p">
                    Some cookies may be strictly necessary for the site to function. Others help us
                    understand traffic and usage patterns so we can improve the experience.
                  </Text>

                  <Heading as="h2" size="md" style={{ color: "var(--color-primary)" }}>
                    Your choices
                  </Heading>
                  <Text as="p">
                    You can manage cookies through your browser settings. Disabling some cookies may
                    impact parts of the experience.
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

