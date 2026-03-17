import { Header } from "@/components/homepage/Header/Header";
import { Footer } from "@/components/homepage/Footer/Footer";
import { Container, Section, Stack, Heading, Text } from "@/components/ui";

export default function PartnerWithUsPage() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: 120 }}>
        <Section style={{ paddingTop: 64, paddingBottom: 64 }}>
          <Container>
            <Stack gap={16} style={{ maxWidth: 860 }}>
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

              <Heading as="h2" size="md">
                What partnerships can look like
              </Heading>
              <Text as="p">
                Co-marketing, talent pipelines, early access pilots, and integration conversations.
              </Text>
              <Text as="p">
                We can also support curated cohorts, employer showcases, and pilot programs to
                validate matching flows with real users before wider release.
              </Text>

              <Heading as="h2" size="md">
                Reach out
              </Heading>
              <Text as="p">
                Email us at{" "}
                <Text as="span" style={{ fontWeight: 600 }}>
                  partners@matchtech.com
                </Text>{" "}
                and tell us what you have in mind.
              </Text>
              <Text as="p">
                Please include a short summary of your audience, your goals, and a timeline (if
                relevant). If it’s a technical partnership, share any APIs or integration needs so
                we can prepare the right team.
              </Text>
            </Stack>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}

