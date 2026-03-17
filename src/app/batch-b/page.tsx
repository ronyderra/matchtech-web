"use client";

import {
  ActiveFiltersBar,
  AddressAutocomplete,
  Alert,
  AvatarGroup,
  BackButton,
  Badge,
  BottomSheet,
  BottomTabBar,
  Breadcrumbs,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  ConfirmDialog,
  Container,
  DatePicker,
  ErrorState,
  FieldGroup,
  FilePreview,
  FileUpload,
  FilterChip,
  FilterGroup,
  FilterPanel,
  FormActions,
  FormField,
  FormRow,
  FormSection,
  Grid,
  Heading,
  ImagePreview,
  InlineEditableField,
  Input,
  KeyValueList,
  List,
  ListItem,
  LoadingScreen,
  LogoBadge,
  MultiSelect,
  NoResultsState,
  Pagination,
  PermissionDenied,
  ProgressBar,
  RangeSlider,
  RetryBlock,
  RichTextEditor,
  SearchInput,
  Section,
  SidebarNav,
  SortDropdown,
  Stack,
  StatCard,
  Switch,
  Tabs,
  TagInput,
  Text,
  Timeline,
  Toast,
  Tooltip,
} from "@/components/ui";
import { SwipeCardDemo } from "@/components/homepage/SwipeCardDemo/SwipeCardDemo";

const MOCK_ADDRESSES = [
  { id: "1", label: "Berlin, Germany (Remote friendly)" },
  { id: "2", label: "Amsterdam, Netherlands" },
  { id: "3", label: "Remote, Europe" },
];

export default function BatchBPage() {
  return (
    <Container>
      <Section
        title="Batch B Components"
        description="Advanced inputs, navigation, data display, filters, media, and app states."
      >
        <Stack gap={32}>
          <Section title="Navigation & layout">
            <Stack gap={16}>
              <Breadcrumbs
                items={[
                  { label: "Home", href: "/" },
                  { label: "Candidates", href: "#" },
                  { label: "Alex Candidate", active: true },
                ]}
              />
              <Stack direction="row" gap={16} wrap>
                <BackButton>Back to matches</BackButton>
                <Tabs
                  tabs={[
                    { id: "profile", label: "Profile" },
                    { id: "activity", label: "Activity" },
                    { id: "notes", label: "Notes" },
                  ]}
                  activeId="profile"
                />
              </Stack>
              <Pagination page={2} pageCount={5} />
              <SidebarNav
                items={[
                  { id: "overview", label: "Overview" },
                  { id: "experience", label: "Experience" },
                  { id: "preferences", label: "Preferences" },
                ]}
                activeId="overview"
              />
              <BottomTabBar
                tabs={[
                  { id: "roles", label: "Roles", icon: "💼" },
                  { id: "matches", label: "Matches", icon: "✨" },
                  { id: "profile", label: "Profile", icon: "👤" },
                ]}
                activeId="matches"
              />
            </Stack>
          </Section>

          <Section title="Advanced inputs">
            <Grid cols={2} stackOnMobile gap={18}>
              <FormSection title="Search & tags">
                <Stack gap={12}>
                  <SearchInput
                    value=""
                    onChange={() => {}}
                    placeholder="Search roles"
                  />
                  <TagInput
                    tags={["React", "TypeScript"]}
                    onChange={() => {}}
                    placeholder="Add skill"
                  />
                  <MultiSelect
                    options={[
                      { value: "remote", label: "Remote" },
                      { value: "hybrid", label: "Hybrid" },
                      { value: "onsite", label: "On-site" },
                    ]}
                    value={["remote", "hybrid"]}
                    onChange={() => {}}
                    placeholder="Work style"
                  />
                </Stack>
              </FormSection>

              <FormSection title="Preference details">
                <Stack gap={12}>
                  <RangeSlider
                    min={40}
                    max={80}
                    value={60}
                    onChange={() => {}}
                    label="Preferred weekly hours"
                  />
                  <DatePicker
                    value={null}
                    onChange={() => {}}
                    placeholder="Earliest start date"
                  />
                  <AddressAutocomplete
                    value=""
                    onChange={() => {}}
                    suggestions={MOCK_ADDRESSES}
                    placeholder="Preferred location"
                  />
                </Stack>
              </FormSection>
            </Grid>

            <FormSection title="Profile summary editor">
              <RichTextEditor
                value="<p>Senior frontend engineer interested in swipe-first hiring products.</p>"
                onChange={() => {}}
              />
            </FormSection>

            <FormSection title="Attachments">
              <Stack gap={12}>
                <FileUpload onFilesSelected={() => {}} />
                <FilePreview
                  name="alex-candidate-cv.pdf"
                  sizeLabel="220 KB"
                  status="done"
                />
              </Stack>
            </FormSection>
          </Section>

          <Section title="Form utilities">
            <FormSection title="Profile basics">
              <FormRow>
                <FormField id="full-name" label="Full name">
                  {(field) => <Input {...field} defaultValue="Alex Candidate" />}
                </FormField>
                <FormField id="headline" label="Headline">
                  {(field) => (
                    <Input
                      {...field}
                      defaultValue="Senior Frontend Engineer · React · TypeScript"
                    />
                  )}
                </FormField>
              </FormRow>

              <FieldGroup label="Match visibility">
                <Stack gap={8}>
                  <Checkbox defaultChecked>Visible to companies in Europe</Checkbox>
                  <Switch defaultChecked>Let companies request intros</Switch>
                </Stack>
              </FieldGroup>

              <InlineEditableField
                label="Short bio"
                value="I enjoy building swipe-first experiences for hiring."
                onSave={() => {}}
                multiline
              />

              <FormActions />
            </FormSection>
          </Section>

          <Section title="Data display">
            <Grid cols={3} stackOnMobile gap={16}>
              <StatCard
                label="Active matches"
                value="8"
                trend="up"
                helperText="Last 7 days"
              />
              <StatCard
                label="Responses"
                value="65%"
                trend="down"
                helperText="Reply rate"
              />
              <StatCard
                label="Saved roles"
                value="14"
                helperText="Across 6 companies"
              />
            </Grid>

            <Grid cols={2} stackOnMobile gap={18}>
              <Card>
                <CardHeader>
                  <Heading size="md">Profile overview</Heading>
                </CardHeader>
                <CardBody>
                  <KeyValueList
                    columns={2}
                    items={[
                      { label: "Location", value: "Remote · Europe" },
                      { label: "Experience", value: "7 years" },
                      { label: "Preferred size", value: "10–200 people" },
                      { label: "Notice period", value: "4 weeks" },
                    ]}
                  />
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <Heading size="md">Timeline</Heading>
                </CardHeader>
                <CardBody>
                  <Timeline
                    items={[
                      {
                        id: "1",
                        title: "Matched with Acme.dev",
                        description: "Senior Frontend Engineer",
                        meta: "Today, 09:32",
                      },
                      {
                        id: "2",
                        title: "Profile updated",
                        description: "Added new React project",
                        meta: "Yesterday",
                      },
                    ]}
                  />
                </CardBody>
              </Card>
            </Grid>

            <Section title="Lists & empty states">
              <Grid cols={2} stackOnMobile gap={18}>
                <Card>
                  <CardHeader>
                    <Heading size="md">Saved roles</Heading>
                  </CardHeader>
                  <CardBody>
                    <List>
                      <ListItem>
                        <Heading size="md">Senior Frontend Engineer</Heading>
                        <Text variant="bodySm">
                          MatchTech Labs · Remote · €110k–€140k
                        </Text>
                      </ListItem>
                      <ListItem>
                        <Heading size="md">Product Engineer</Heading>
                        <Text variant="bodySm">
                          SwipeHire · Berlin · €95k–€120k
                        </Text>
                      </ListItem>
                    </List>
                  </CardBody>
                </Card>
              </Grid>

              <ProgressBar value={3} max={5} label="Profile completeness" />
            </Section>
          </Section>

          <Section title="Filters & discovery">
            <FilterPanel>
              <FormRow>
                <FilterGroup title="Location">
                  <Stack direction="row" gap={8} wrap>
                    <FilterChip active>Remote</FilterChip>
                    <FilterChip>Hybrid</FilterChip>
                    <FilterChip>On-site</FilterChip>
                  </Stack>
                </FilterGroup>
                <FilterGroup title="Seniority">
                  <Stack direction="row" gap={8} wrap>
                    <FilterChip>Mid</FilterChip>
                    <FilterChip active>Senior</FilterChip>
                    <FilterChip>Lead</FilterChip>
                  </Stack>
                </FilterGroup>
              </FormRow>
              <ActiveFiltersBar
                filters={[
                  { id: "remote", label: "Remote" },
                  { id: "senior", label: "Senior" },
                ]}
              />
              <SortDropdown
                value="relevance"
                onChange={() => {}}
                options={[
                  { id: "relevance", label: "Relevance" },
                  { id: "newest", label: "Newest" },
                ]}
              />
            </FilterPanel>
          </Section>

          <Section title="Overlays, media & feedback">
              <Grid cols={2} stackOnMobile gap={18}>
              <Stack gap={12}>
                <Tooltip label="Companies see this when you match">
                  <Badge>Public headline</Badge>
                </Tooltip>
                <Alert status="info" title="Profile visibility">
                  Your profile is visible to companies in Europe.
                </Alert>
                <Toast
                  open
                  status="success"
                  title="Changes saved"
                  description="Your profile edits have been applied."
                />
              </Stack>

              <Stack gap={12}>
                <AvatarGroup
                  names={["Alex Candidate", "Taylor Hiring", "Jordan Recruiter"]}
                />
                <LogoBadge logo="💼">MatchTech Labs</LogoBadge>
                <ImagePreview overlay="Swipe count: 24" />
                <FilePreview name="portfolio.pdf" sizeLabel="1.8 MB" status="uploading" />
              </Stack>
            </Grid>

            <Section title="Swipe demo">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <SwipeCardDemo />
              </div>
            </Section>

            <Grid cols={2} stackOnMobile gap={18}>
              <ErrorState
                title="We couldn’t load your matches"
                description="This is likely temporary. Try again in a moment."
                action={<RetryBlock message="Temporary error" onRetry={() => {}} />}
              />
              <NoResultsState
                title="No roles match your filters"
                description="Try widening your location or salary range."
              />
              <PermissionDenied
                title="You don’t have access to this workspace"
                description="Ask your team admin to invite you to MatchTech for Companies."
              />
            </Grid>
          </Section>

          <Section title="Loading & sheets">
            <Stack gap={12}>
              <BottomSheet open title="Filters on mobile">
                <Text variant="bodySm">
                  On mobile, this bottom sheet holds filters so the swipe column stays
                  focused.
                </Text>
              </BottomSheet>
              {/* <ConfirmDialog
                open
                title="Clear all filters?"
                description="This will reset your current discovery preferences."
              /> */}
              {/* <LoadingScreen /> */}
            </Stack>
          </Section>
        </Stack>
      </Section>
    </Container>
  );
}

