import { Header } from "@/components/homepage/Header/Header";
import { Footer } from "@/components/homepage/Footer/Footer";
import { Container, Section, Stack, Heading, Text } from "@/components/ui";

export default function UserAgreementPage() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: 120 }}>
        <Section style={{ paddingTop: 64, paddingBottom: 64 }}>
          <Container>
            <Stack gap={16} style={{ maxWidth: 860 }}>
              <Heading as="h1" size="xl">
                User Agreement
              </Heading>
              <Text as="p" style={{ color: "var(--color-text-secondary)" }}>
                This User Agreement is a simple placeholder for the MatchTech demo. It describes
                the basic expectations for using the platform and will be updated before launch.
              </Text>
              <Text as="p">
                MatchTech is designed to help candidates and companies connect when there’s mutual
                interest. To keep the experience high-signal, we ask that users provide truthful
                information and engage respectfully.
              </Text>

              <Heading as="h2" size="md">
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

              <Heading as="h2" size="md">
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

              <Heading as="h2" size="md">
                Agreement updates
              </Heading>
              <Text as="p">
                We may update this agreement and will post the latest version on this page.
              </Text>
            </Stack>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}

