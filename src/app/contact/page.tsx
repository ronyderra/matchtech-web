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
            <Stack gap={16} style={{ maxWidth: 860 }}>
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

              <Heading as="h2" size="md">
                Email
              </Heading>
              <Text as="p">
                General inquiries:{" "}
                <Text as="span" style={{ fontWeight: 600 }}>
                  hello@matchtech.com
                </Text>
                <br />
                Support:{" "}
                <Text as="span" style={{ fontWeight: 600 }}>
                  support@matchtech.com
                </Text>
              </Text>
              <Text as="p">
                For press and media requests, please contact{" "}
                <Text as="span" style={{ fontWeight: 600 }}>
                  press@matchtech.com
                </Text>
                .
              </Text>

              <Heading as="h2" size="md">
                Partnerships
              </Heading>
              <Text as="p">
                If you’re interested in partnering, reach out at{" "}
                <Text as="span" style={{ fontWeight: 600 }}>
                  partners@matchtech.com
                </Text>
                .
              </Text>
              <Text as="p">
                For legal or privacy-related questions, you can also email{" "}
                <Text as="span" style={{ fontWeight: 600 }}>
                  privacy@matchtech.com
                </Text>{" "}
                and we’ll route your message to the right place.
              </Text>
            </Stack>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}

