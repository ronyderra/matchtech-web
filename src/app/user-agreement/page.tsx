import { Header } from "@/components/homepage/Header/Header";
import { Footer } from "@/components/homepage/Footer/Footer";
import { Container, Section, Stack, Heading, Text } from "@/components/ui";
import { MatchTechStructuredData } from "@/components/seo/MatchTechStructuredData";
import { createPageMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";

const USER_AGREEMENT_TITLE = "User Agreement | MatchTech";
const USER_AGREEMENT_DESCRIPTION =
  "Understand the expectations for using MatchTech, including account responsibilities and acceptable use.";

export const metadata: Metadata = createPageMetadata({
  pathname: "/user-agreement",
  title: USER_AGREEMENT_TITLE,
  description: USER_AGREEMENT_DESCRIPTION,
});

export default function UserAgreementPage() {
  return (
    <>
      <MatchTechStructuredData
        page="user-agreement"
        path="/user-agreement"
        title={USER_AGREEMENT_TITLE}
        description={USER_AGREEMENT_DESCRIPTION}
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
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)",
              }}
            >
              <div style={{ height: 6, background: "var(--color-primary)" }} />
              <div style={{ padding: 28 }}>
                <Stack gap={14} style={{ maxWidth: 860 }}>
                  <Heading as="h1" size="xl">
                    User Agreement
                  </Heading>
                  <Text as="p" style={{ color: "var(--color-text-secondary)" }}>
                    This User Agreement describes the basic expectations for using MatchTech,
                    including your account responsibilities and acceptable use.
                  </Text>
                  <Text as="p">
                    MatchTech is designed to help candidates and companies connect when there’s mutual
                    interest. To keep the experience high-signal, we ask that users provide truthful
                    information and engage respectfully.
                  </Text>

                  <Heading as="h2" size="md" style={{ color: "var(--color-primary)" }}>
                    Eligibility and accounts
                  </Heading>
                  <Text as="p">
                    You’re responsible for maintaining the confidentiality of your account and for all
                    activity that occurs under it.
                  </Text>
                  <Text as="p">
                    If you believe your account has been compromised, contact support and update your
                    credentials promptly. You may not share accounts or access the service using someone
                    else’s credentials without permission.
                  </Text>

                  <Heading as="h2" size="md" style={{ color: "var(--color-primary)" }}>
                    Acceptable use
                  </Heading>
                  <Text as="p">
                    Please don’t post misleading information, harass other users, or attempt to abuse
                    the matching and messaging experience.
                  </Text>
                  <Text as="p">
                    This includes attempts to automate actions, scrape data, or use the platform to send
                    unsolicited marketing. We may remove content or suspend accounts to protect users
                    and maintain product integrity.
                  </Text>

                  <Heading as="h2" size="md" style={{ color: "var(--color-primary)" }}>
                    Agreement updates
                  </Heading>
                  <Text as="p">
                    We may update this agreement and will post the latest version on this page.
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

