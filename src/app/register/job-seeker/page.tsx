"use client";

import { useState } from "react";
import {
  Breadcrumbs,
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
  DatePicker,
  Checkbox,
  Button,
} from "@/components/ui";

export default function JobSeekerRegisterPage() {
  const [dob, setDob] = useState<Date | null>(null);

  return (
    <Container>
      <div style={{ paddingTop: 8, paddingBottom: 8 }}>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Register", href: "/register/job-seeker" },
            { label: "Job Seeker", active: true },
          ]}
        />
      </div>
      <Section
        title="Join MatchTech as a Job Seeker"
        description="Tell us a bit about yourself to get started."
      >
        <Stack gap={32}>
          <FormSection title="Stage 1 – Personal Information">
            <FormRow>
              <FormField id="first-name" label="First Name">
                {(field) => <Input {...field} />}
              </FormField>
              <FormField id="last-name" label="Last Name">
                {(field) => <Input {...field} />}
              </FormField>
            </FormRow>

            <FormRow>
              <FormField id="id-number" label="ID Number">
                {(field) => <Input {...field} />}
              </FormField>
              <FormField id="region" label="Region / Location">
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
            </FormRow>

            <FormField id="dob" label="Date of Birth">
              {() => (
                <DatePicker
                  value={dob}
                  onChange={setDob}
                  placeholder="Select your date of birth"
                />
              )}
            </FormField>
          </FormSection>

          <FormSection title="Stage 2 – Account Setup">
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
              <Checkbox>
                Confirm you are 18+
              </Checkbox>
              <Checkbox>
                Allow location access
              </Checkbox>
            </Stack>

            <Button style={{ marginTop: 16 }}>Continue</Button>
          </FormSection>
        </Stack>
      </Section>
    </Container>
  );
}

