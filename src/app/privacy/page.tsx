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
            <Stack gap={16} style={{ maxWidth: 860 }}>
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

              <Heading as="h2" size="md">
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

              <Heading as="h2" size="md">
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

              <Heading as="h2" size="md">
                Contact
              </Heading>
              <Text as="p">
                Questions about privacy can be sent to{" "}
                <Text as="span" style={{ fontWeight: 600 }}>
                  privacy@matchtech.com
                </Text>
                .
              </Text>
            </Stack>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}

