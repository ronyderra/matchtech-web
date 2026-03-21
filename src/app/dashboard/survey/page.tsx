"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  FormField,
  FormRow,
  FormSection,
  Input,
  MultiSelectChips,
  MultiSelectDropdown,
  Select,
} from "@/components/ui";
import { COUNTRIES, DEPARTMENTS } from "@/constants/options";
import { useUserStore } from "@/store";
import type {
  CompensationPreference,
  EmploymentType,
  JobPosition,
  PriorityPreference,
  Seniority,
  TalentDetails,
  WorkPreference,
} from "@/types";
import {
  buildTalentDbUpsertPayload,
  PENDING_PROFILE_UPSERT_KEY,
  syncTalentProfileToApi,
} from "@/lib/profilePayload";

const IS_DEV = process.env.NODE_ENV === "development";

const SENIORITY_OPTIONS: { value: Seniority; label: string }[] = [
  { value: "any", label: "Any" },
  { value: "student", label: "Student position" },
  { value: "junior", label: "Junior" },
  { value: "mid", label: "Mid-level" },
  { value: "senior", label: "Senior" },
  { value: "lead", label: "Lead" },
  { value: "principal", label: "Principal" },
];

const EMPLOYMENT_TYPE_OPTIONS: { value: EmploymentType; label: string }[] = [
  { value: "any", label: "Any" },
  { value: "student", label: "Student" },
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "freelance", label: "Freelance" },
];

const WORK_PREFERENCE_OPTIONS: { value: WorkPreference; label: string }[] = [
  { value: "any", label: "Any" },
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
  { value: "onsite", label: "On-site" },
];

const CURRENCIES = [
  { value: "ILS", label: "₪ ILS" },
  { value: "USD", label: "$ USD" },
  { value: "EUR", label: "€ EUR" },
  { value: "GBP", label: "£ GBP" },
];

const AVAILABILITY_OPTIONS = [
  { value: "", label: "Select" },
  { value: "Immediately", label: "Immediately" },
  { value: "In 2 weeks", label: "In 2 weeks" },
  { value: "In 1 month", label: "In 1 month" },
  { value: "In 3 months", label: "In 3 months" },
  { value: "Not sure yet", label: "Not sure yet" },
] as const;

const PRIORITY_OPTIONS = [
  { value: "High salary", label: "High salary" },
  { value: "Remote work", label: "Remote work" },
  { value: "Flexible hours", label: "Flexible hours" },
  { value: "Work-life balance", label: "Work-life balance" },
  { value: "Fast growth", label: "Fast growth" },
  { value: "Learning & mentorship", label: "Learning & mentorship" },
  { value: "Stability", label: "Stability" },
  { value: "Great team / culture", label: "Great team / culture" },
  { value: "Interesting product", label: "Interesting product" },
  { value: "Strong tech stack", label: "Strong tech stack" },
  { value: "Impact / ownership", label: "Impact / ownership" },
  { value: "Equity upside", label: "Equity upside" },
] satisfies { value: string; label: string }[];

const COMPENSATION_PREFERENCES = [
  "Performance bonus",
  "Revenue share / commission",
  "Equity / stock options",
  "Signing bonus",
  "Profit sharing",
  "Retention bonus",
  "Tips / variable earnings",
  "Overtime pay",
  "Benefits (health, pension, etc.)",
  "Flexible compensation (choose your mix)",
  "Not important",
] as const;

const COMPENSATION_PREFERENCE_OPTIONS = COMPENSATION_PREFERENCES.map((v) => ({
  value: v,
  label: v,
}));

const defaultJobPosition: Omit<JobPosition, "id"> = {
  industry: "",
  seniority: "any",
  employmentType: "any",
  workPreference: "any",
};

export default function SurveyPage() {
  const router = useRouter();
  const user = useUserStore((s) => s.user);
  const initDraft = useUserStore((s) => s.initDraft);
  const patchUser = useUserStore((s) => s.patchUser);
  const [jobPosition, setJobPosition] = useState<Omit<JobPosition, "id">>(defaultJobPosition);
  const [availability, setAvailability] = useState("");
  const [priorities, setPriorities] = useState<PriorityPreference[]>([]);
  const [compensationPreferences, setCompensationPreferences] = useState<CompensationPreference[]>([]);

  useEffect(() => {
    initDraft("talent");
  }, [initDraft]);

  useEffect(() => {
    if (!user || user.type !== "talent") return;
    const t = user as TalentDetails;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setJobPosition({
      industry: t.jobPosition.industry ?? "",
      departments: t.jobPosition.departments ?? [],
      seniority: t.jobPosition.seniority,
      employmentType: t.jobPosition.employmentType,
      country: t.jobPosition.country,
      city: t.jobPosition.city,
      workPreference: t.jobPosition.workPreference,
      salaryMin: t.jobPosition.salaryMin,
      salaryMax: t.jobPosition.salaryMax,
      currency: t.jobPosition.currency,
      equity: t.jobPosition.equity,
    });
    setAvailability(t.availableFrom ?? "");
    setPriorities((t.priorities ?? []) as PriorityPreference[]);
    setCompensationPreferences((t.compensationPreferences ?? []) as CompensationPreference[]);
  }, [user]);

  async function markComplete() {
    if (user?.type === "talent") {
      const jobPositionWithId: JobPosition = {
        id: user.jobPosition.id,
        ...jobPosition,
      };
      jobPositionWithId.equity = compensationPreferences.includes("Equity / stock options");
      const nextTalent = {
        ...(user as TalentDetails),
        jobPosition: jobPositionWithId,
        availableFrom: availability || undefined,
        priorities: priorities.length ? priorities.slice(0, 3) : undefined,
        compensationPreferences: compensationPreferences.length
          ? compensationPreferences.slice(0, 3)
          : undefined,
      } as TalentDetails;
      patchUser(nextTalent);
      window.localStorage.setItem(
        PENDING_PROFILE_UPSERT_KEY,
        JSON.stringify(buildTalentDbUpsertPayload(nextTalent))
      );
      try {
        const synced = await syncTalentProfileToApi(nextTalent);
        patchUser(synced);
        window.localStorage.setItem(
          PENDING_PROFILE_UPSERT_KEY,
          JSON.stringify(buildTalentDbUpsertPayload(synced))
        );
      } catch {
        window.alert("Could not save survey data to database. Please try again.");
        return;
      }
    }
    window.localStorage.setItem("onboarding.surveyCompleted", "true");
    router.push("/dashboard/swipe");
  }

  return (
    <main style={{ maxWidth: 980, margin: "0 auto" }}>
      <section
        style={{
          padding: "20px 24px",
          borderRadius: 16,
          border: "1px solid var(--color-border)",
          background: "var(--color-surface)",
        }}
      >
        <p style={{ margin: 0, fontSize: 13, color: "var(--color-text-muted)" }}>Survey</p>
        <h1 style={{ margin: "6px 0 8px", fontSize: 30, lineHeight: "36px" }}>What are you looking for?</h1>
        <p style={{ margin: 0, color: "var(--color-text-secondary)" }}>
          Tell us what kind of role and setup you want so we can match you with the right opportunities. This maps
          to your desired job position.
        </p>

        <FormSection title="Survey details">
          <FormRow columns={1}>
            <FormField id="departments" label="Departments (pick up to 4)" required>
              {() => (
                <MultiSelectDropdown
                  value={jobPosition.departments ?? []}
                  options={DEPARTMENTS.map((d) => ({ value: d, label: d }))}
                  placeholder="Select up to 4"
                  maxSelected={4}
                  onChange={(next) =>
                    setJobPosition((prev) => ({
                      ...prev,
                      departments: next.slice(0, 4),
                    }))
                  }
                />
              )}
            </FormField>
          </FormRow>

          <FormRow>
            <FormField id="seniority" label="Seniority" required>
              {(field) => (
                <Select
                  {...field}
                  value={jobPosition.seniority}
                  onChange={(e) =>
                    setJobPosition((prev) => ({
                      ...prev,
                      seniority: e.target.value as Seniority,
                    }))
                  }
                >
                  {SENIORITY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Select>
              )}
            </FormField>
            <FormField id="employment-type" label="Employment type" required>
              {(field) => (
                <Select
                  {...field}
                  value={jobPosition.employmentType}
                  onChange={(e) =>
                    setJobPosition((prev) => ({
                      ...prev,
                      employmentType: e.target.value as EmploymentType,
                    }))
                  }
                >
                  {EMPLOYMENT_TYPE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Select>
              )}
            </FormField>
          </FormRow>

          <FormRow>
            <FormField id="availability" label="Availability (when can you start?)">
              {(field) => (
                <Select {...field} value={availability} onChange={(e) => setAvailability(e.target.value)}>
                  {AVAILABILITY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Select>
              )}
            </FormField>
            <FormField id="work-preference" label="Work preference" required>
              {(field) => (
                <Select
                  {...field}
                  value={jobPosition.workPreference}
                  onChange={(e) =>
                    setJobPosition((prev) => ({
                      ...prev,
                      workPreference: e.target.value as WorkPreference,
                    }))
                  }
                >
                  {WORK_PREFERENCE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Select>
              )}
            </FormField>
          </FormRow>

          <FormRow>
            <FormField id="country" label="Country" required>
              {(field) => (
                <Select
                  {...field}
                  value={jobPosition.country ?? ""}
                  onChange={(e) =>
                    setJobPosition((prev) => ({
                      ...prev,
                      country: e.target.value || undefined,
                    }))
                  }
                >
                  <option value="" disabled>
                    Select country
                  </option>
                  {COUNTRIES.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </Select>
              )}
            </FormField>
            <FormField id="city" label="Preferred city (optional)">
              {(field) => (
                <Input
                  {...field}
                  placeholder="e.g. Tel Aviv"
                  value={jobPosition.city ?? ""}
                  onChange={(e) =>
                    setJobPosition((prev) => ({
                      ...prev,
                      city: e.target.value || undefined,
                    }))
                  }
                />
              )}
            </FormField>
          </FormRow>

          <FormRow>
            <FormField id="salary-min" label="Salary min" required>
              {(field) => (
                <Input
                  {...field}
                  type="number"
                  placeholder="Min"
                  min={0}
                  value={jobPosition.salaryMin ?? ""}
                  onChange={(e) => {
                    const v = e.target.value;
                    setJobPosition((prev) => ({
                      ...prev,
                      salaryMin: v === "" ? undefined : Number(v),
                    }));
                  }}
                />
              )}
            </FormField>
            <FormField id="currency" label="Currency" required>
              {(field) => (
                <Select
                  {...field}
                  value={jobPosition.currency ?? ""}
                  onChange={(e) =>
                    setJobPosition((prev) => ({
                      ...prev,
                      currency: e.target.value || undefined,
                    }))
                  }
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {CURRENCIES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </Select>
              )}
            </FormField>
          </FormRow>

          <div style={{ marginTop: 14 }}>
            <FormField
              id="compensation-preferences"
              label={
                <span style={{ color: "var(--color-text-primary)" }}>
                  Which additional compensation matters to you? (pick up to 3)
                </span>
              }
            >
              {() => (
                <MultiSelectChips
                  value={compensationPreferences}
                  options={COMPENSATION_PREFERENCE_OPTIONS}
                  maxSelected={3}
                  onChange={(next) => {
                    const trimmed = next.slice(0, 3);
                    setCompensationPreferences(
                      (trimmed.includes("Not important") ? ["Not important"] : trimmed) as CompensationPreference[]
                    );
                  }}
                />
              )}
            </FormField>
          </div>

          <div style={{ marginTop: 14 }}>
            <FormField
              id="priorities"
              label={
                <span style={{ color: "var(--color-text-primary)" }}>
                  What matters most to you? (pick up to 3)
                </span>
              }
            >
              {() => (
                <MultiSelectChips
                  value={priorities}
                  options={PRIORITY_OPTIONS}
                  maxSelected={3}
                  onChange={(next) => setPriorities(next.slice(0, 3) as PriorityPreference[])}
                />
              )}
            </FormField>
          </div>

          <div style={{ marginTop: 16 }}>
            <Button
              type="button"
              onClick={markComplete}
              disabled={
                !IS_DEV &&
                (!jobPosition.country ||
                  !jobPosition.departments?.length ||
                  jobPosition.salaryMin === undefined ||
                  !jobPosition.currency)
              }
            >
              Save / Submit
            </Button>
          </div>
        </FormSection>
      </section>
    </main>
  );
}
