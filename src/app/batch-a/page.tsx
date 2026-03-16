"use client";

import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Chip,
  Container,
  Divider,
  DropdownMenu,
  Drawer,
  FormField,
  Grid,
  Heading,
  IconButton,
  Input,
  Label,
  Section,
  Select,
  Skeleton,
  Spinner,
  Stack,
  Switch,
  Tabs,
  Text,
  TextArea,
  Toast,
} from "@/components/ui";

export default function BatchAPage() {
  return (
    <Container>
      <Section
        title="Batch A Components"
        description="First pass of core MatchTech UI primitives, wired to design tokens and ready for mobile."
      >
        <Stack gap={24}>
          <Section title="Typography">
            <Stack gap={12}>
              <Heading size="xl" as="h1">
                Heading xl – Swipe-first hiring for modern teams
              </Heading>
              <Heading size="lg" as="h2">
                Heading lg – Roles that match how you actually work
              </Heading>
              <Heading size="md" as="h3">
                Heading md – Senior Frontend Engineer
              </Heading>
              <Text>
                Body – Candidates and companies swipe on each other. When both
                sides say yes, it is an instant match.
              </Text>
              <Text variant="bodySm">
                BodySm – Used for secondary copy, hints, and helper text.
              </Text>
              <Text variant="muted">
                Muted – Meta information like posted date and location.
              </Text>
            </Stack>
          </Section>

          <Divider label="Buttons" />

          <Section>
            <Grid cols={3} gap={12} stackOnMobile>
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button loading fullWidth>
                Loading full-width
              </Button>
              <Stack direction="row" gap={8} wrap>
                <IconButton aria-label="Reject">
                  ✕
                </IconButton>
                <IconButton aria-label="Like" variant="ghost">
                  ✓
                </IconButton>
                <IconButton aria-label="Danger" variant="danger">
                  !
                </IconButton>
              </Stack>
            </Grid>
          </Section>

          <Divider label="Form inputs" />

          <Section>
            <Grid cols={2} stackOnMobile gap={18}>
              <FormField
                id="name"
                label="Full name"
                hint="This is how it appears to companies."
              >
                {(field) => <Input {...field} placeholder="Alex Candidate" />}
              </FormField>

              <FormField
                id="headline"
                label="Headline"
                hint="One line that describes your experience."
              >
                {(field) => (
                  <Input
                    {...field}
                    placeholder="Senior Frontend Engineer · React · TypeScript"
                  />
                )}
              </FormField>

              <FormField
                id="about"
                label="About"
                hint="A short summary recruiters see first."
              >
                {(field) => (
                  <TextArea
                    {...field}
                    placeholder="I enjoy building polished web products with modern stacks..."
                  />
                )}
              </FormField>

              <FormField
                id="location"
                label="Location preference"
                error="Please pick at least one region."
              >
                {(field) => (
                  <Select {...field} defaultValue="">
                    <option value="" disabled>
                      Select region
                    </option>
                    <option value="remote-eu">Remote · Europe</option>
                    <option value="hybrid-berlin">Hybrid · Berlin</option>
                  </Select>
                )}
              </FormField>
            </Grid>

            <Stack gap={12}>
              <Checkbox defaultChecked>Open to remote roles</Checkbox>
              <Switch defaultChecked>Show me senior roles only</Switch>
            </Stack>
          </Section>

          <Divider label="Form support" />

          <Section>
            <Stack gap={12}>
              <div>
                <Label htmlFor="sample-label" required>
                  Label component
                </Label>
                <Input id="sample-label" placeholder="Used outside FormField too" />
              </div>
              <div>
                <Text variant="muted">
                  `FormField` already wires labels, hints, and errors together. This
                  snippet shows `Label` and error copy used standalone.
                </Text>
                <Text
                  as="p"
                  style={{ color: "var(--color-danger)", fontSize: "var(--font-size-caption)" }}
                >
                  ErrorMessage – Invalid value for this field.
                </Text>
              </div>
            </Stack>
          </Section>

          <Divider label="Surfaces & status" />

          <Section>
            <Grid cols={2} stackOnMobile gap={18}>
              <Card>
                <CardHeader>
                  <Stack direction="row" gap={12} align="center">
                    <Avatar size="md" name="Acme.dev" />
                    <div>
                      <Heading size="md">Senior Frontend Engineer</Heading>
                      <Text variant="bodySm">
                        Acme.dev · Remote · Full-time
                      </Text>
                    </div>
                    <Chip variant="primary">Swipe concept</Chip>
                  </Stack>
                </CardHeader>
                <CardBody>
                  <Text variant="bodySm">
                    Work with a modern stack to build swipe-first hiring
                    experiences for thousands of candidates and teams.
                  </Text>
                  <Stack
                    direction="row"
                    gap={8}
                    wrap
                    style={{ marginTop: 12 }}
                  >
                    <Chip>5+ years experience</Chip>
                    <Chip>React · TypeScript · Next.js</Chip>
                    <Chip>Europe · Remote friendly</Chip>
                  </Stack>
                </CardBody>
                <CardFooter>
                  <Stack
                    direction="row"
                    align="center"
                    justify="space-between"
                    style={{ width: "100%" }}
                  >
                    <Text variant="muted">
                      Swipe right if you&apos;d talk to this team.
                    </Text>
                    <Stack direction="row" gap={8}>
                      <IconButton aria-label="Reject" variant="danger">
                        ✕
                      </IconButton>
                      <IconButton aria-label="Match">
                        ✓
                      </IconButton>
                    </Stack>
                  </Stack>
                </CardFooter>
              </Card>

              <Stack gap={16}>
                <Stack direction="row" gap={12} align="center">
                  <Avatar size="sm" name="Alex Candidate" />
                  <Avatar size="md" name="Taylor Hiring" />
                  <Avatar size="lg" name="MatchTech" />
                </Stack>
                <Stack direction="row" gap={8} align="center">
                  <Badge>New</Badge>
                  <Badge>Beta</Badge>
                </Stack>
                <Stack direction="row" gap={8} align="center">
                  <Spinner size="sm" />
                  <Text variant="bodySm">Loading matches…</Text>
                </Stack>
                <Stack gap={8}>
                  <Skeleton width="80%" />
                  <Skeleton width="60%" />
                  <Skeleton width="40%" />
                </Stack>
              </Stack>
            </Grid>
          </Section>

          <Divider label="Feedback & overlays (static samples)" />

          <Section>
            <Grid cols={2} stackOnMobile gap={18}>
              <Stack gap={12}>
                <Alert status="success" title="Match created">
                  We&apos;ve introduced you and Acme.dev. Expect a message soon.
                </Alert>
                <Alert status="error" title="Something went wrong">
                  We couldn&apos;t save your changes. Try again in a moment.
                </Alert>
                <Alert status="info" title="Profile visibility">
                  Your profile is visible to companies in Europe.
                </Alert>
              </Stack>

              <Stack gap={12}>
                {/* <Modal
                  open
                  title="Example modal"
                  description="Used for focused tasks like editing profile basics."
                  primaryActionLabel="Save"
                  secondaryActionLabel="Cancel"
                >
                  <Text variant="bodySm">
                    This is a static preview of the modal component. In real
                    flows this opens and closes based on state.
                  </Text>
                </Modal> */}
                <Drawer
                  open
                  title="Filters drawer"
                  side="bottom"
                  primaryActionLabel="Apply"
                >
                  <Text variant="bodySm">
                    Bottom sheet-style drawer that works well on mobile for
                    filters and details.
                  </Text>
                </Drawer>
              </Stack>
            </Grid>
          </Section>

          <Divider label="Tabs, menu & toast (static shape)" />

          <Section>
            <Stack gap={18}>
              <Tabs
                tabs={[
                  { id: "roles", label: "Roles" },
                  { id: "matches", label: "Matches" },
                  { id: "saved", label: "Saved" },
                ]}
                activeId="roles"
              />

              <DropdownMenu
                triggerLabel="More actions"
                items={[
                  { id: "share", label: "Share profile" },
                  { id: "pause", label: "Pause searching" },
                  { id: "settings", label: "Settings" },
                ]}
              />

              <Toast
                open
                status="success"
                title="Saved"
                description="Your profile changes have been saved."
              />
            </Stack>
          </Section>
        </Stack>
      </Section>
    </Container>
  );
}

