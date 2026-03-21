import { Header } from "@/components/homepage/Header/Header";
import { Footer } from "@/components/homepage/Footer/Footer";
import { PartnerInquiryForm } from "@/components/partner/PartnerInquiryForm";
import { Container, Section, Stack, Heading, Text } from "@/components/ui";
import { MatchTechStructuredData } from "@/components/seo/MatchTechStructuredData";
import { createPageMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";

const PARTNER_TITLE = "Partner with MatchTech | Talent & Hiring Collaborations";
const PARTNER_DESCRIPTION =
  "Partner with MatchTech through co-marketing, talent pipelines, and swipe-first hiring program pilots for communities and employers.";

export const metadata: Metadata = createPageMetadata({
  pathname: "/partner",
  title: PARTNER_TITLE,
  description: PARTNER_DESCRIPTION,
});

export default function PartnerWithUsPage() {
  return (
    <>
      <MatchTechStructuredData
        page="partner"
        path="/partner"
        title={PARTNER_TITLE}
        description={PARTNER_DESCRIPTION}
      />
      <Header />
      <main style={{ paddingTop: 72 }}>
        <Section style={{ paddingTop: 16, paddingBottom: 64 }}>
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
                    Partner with us
                  </Heading>
                  <Text as="p" style={{ color: "var(--color-text-secondary)" }}>
                    We’re open to partnerships with communities, accelerators, events, and hiring teams
                    who want a faster way to connect talent with opportunity.
                  </Text>
                  <Text as="p">
                    Whether you’re running a talent community, operating a hiring program, or building
                    tooling in the recruiting ecosystem, we’re happy to explore collaboration that
                    creates value for members and candidates.
                  </Text>

                  <Heading as="h2" size="md" style={{ color: "var(--color-primary)" }}>
                    What partnerships can look like
                  </Heading>
                  <Text as="p">
                    Co-marketing, talent pipelines, early access pilots, and integration conversations.
                  </Text>
                  <Text as="p">
                    We can also support curated cohorts, employer showcases, and pilot programs to
                    validate matching flows with real users before wider release.
                  </Text>

                  <Heading as="h2" size="md" style={{ color: "var(--color-primary)" }}>
                    Reach out
                  </Heading>
                  <Text as="p">
                    Email us at{" "}
                    <Text as="span" style={{ fontWeight: 600, color: "var(--color-primary)" }}>
                      partners@matchtech.com
                    </Text>{" "}
                    and tell us what you have in mind.
                  </Text>
                  <Text as="p">
                    Please include a short summary of your audience, your goals, and a timeline (if
                    relevant). If it’s a technical partnership, share any APIs or integration needs so
                    we can prepare the right team.
                  </Text>
                  <Text as="p" style={{ color: "var(--color-text-secondary)" }}>
                    Or submit the form below — we’ll route it to the partnerships team.
                  </Text>
                  <PartnerInquiryForm />
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

