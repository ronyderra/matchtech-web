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
            <Stack gap={16} style={{ maxWidth: 860 }}>
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

              <Heading as="h2" size="md">
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

              <Heading as="h2" size="md">
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
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}

