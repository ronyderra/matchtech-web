"use client";

import {
  Container,
  Section,
  Stack,
  Heading,
  Text,
  FormSection,
  FormRow,
  FormField,
  Input,
  Select,
  Checkbox,
  Button,
  BackButton,
} from "@/components/ui";

export default function EmployerRegisterPage() {
  return (
    <Container>
      <div style={{ paddingTop: 12 }}>
        <BackButton>Go back</BackButton>
      </div>
      <Section
        title="Join MatchTech as an Employer"
        description="Create a hiring account to start discovering talent."
      >
        <Stack gap={32}>
          <FormSection title="Step 1 – Company Information">
            <FormRow>
              <FormField id="company-name" label="Company Name">
                {(field) => <Input {...field} />}
              </FormField>
              <FormField
                id="company-id"
                label="Company ID / Registration Number"
              >
                {(field) => <Input {...field} />}
              </FormField>
            </FormRow>

            <FormField id="company-region" label="Region / Location">
              {(field) => (
                <Select {...field} defaultValue="">
                  <option value="" disabled>
                    Select region
                  </option>
                  <option value="eu">Europe</option>
                  <option value="us">United States</option>
                  <option value="remote">Remote</option>
                </Select>
              )}
            </FormField>
          </FormSection>

          <FormSection title="Step 2 – Account Setup">
            <FormRow>
              <FormField id="email" label="Email Address">
                {(field) => <Input {...field} type="email" />}
              </FormField>
              <FormField id="confirm-email" label="Confirm Email">
                {(field) => <Input {...field} type="email" />}
              </FormField>
            </FormRow>

            <FormRow>
              <FormField id="password" label="Password">
                {(field) => <Input {...field} type="password" />}
              </FormField>
              <FormField id="confirm-password" label="Confirm Password">
                {(field) => <Input {...field} type="password" />}
              </FormField>
            </FormRow>

            <FormField id="phone" label="Phone Number (optional)">
              {(field) => <Input {...field} type="tel" />}
            </FormField>

            <Stack gap={8}>
              <Checkbox defaultChecked>
                Agree to Terms of Service
              </Checkbox>
            </Stack>

            <Button style={{ marginTop: 16 }}>Continue</Button>
          </FormSection>
        </Stack>
      </Section>
    </Container>
  );
}

