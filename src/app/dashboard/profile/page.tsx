"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Divider,
  FormField,
  FormRow,
  FormSection,
  Input,
  MultiSelectChips,
  MultiSelectDropdown,
  Select,
  TagInput,
  TextArea,
  Toast,
} from "@/components/ui";
import { useUserStore } from "@/store";
import type {
  CompensationPreference,
  EmploymentType,
  PriorityPreference,
  Seniority,
  TalentDetails,
  WorkPreference,
} from "@/types";
import { COUNTRIES, DEPARTMENTS } from "@/constants/options";
import {
  buildTalentDbUpsertPayload,
  PENDING_PROFILE_UPSERT_KEY,
  syncTalentProfileToApi,
} from "@/lib/profilePayload";

type ExperienceDraft = {
  companyName: string;
  industry: string;
  yearsInCompany: string;
  roleInCompany: string;
};

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

export default function ProfilePage() {
  const user = useUserStore((s) => s.user);
  const patchUser = useUserStore((s) => s.patchUser);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressCountry, setAddressCountry] = useState("");
  const [bio, setBio] = useState("");
  const [skillsProfile, setSkillsProfile] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [availability, setAvailability] = useState("");
  const [departments, setDepartments] = useState<string[]>([]);
  const [seniority, setSeniority] = useState<Seniority>("any");
  const [employmentType, setEmploymentType] = useState<EmploymentType>("any");
  const [workPreference, setWorkPreference] = useState<WorkPreference>("any");
  const [preferredCountry, setPreferredCountry] = useState("");
  const [preferredCity, setPreferredCity] = useState("");
  const [salaryMin, setSalaryMin] = useState<string>("");
  const [currency, setCurrency] = useState("");
  const [priorities, setPriorities] = useState<PriorityPreference[]>([]);
  const [compensationPreferences, setCompensationPreferences] = useState<CompensationPreference[]>([]);
  const [experienceDrafts, setExperienceDrafts] = useState<ExperienceDraft[]>([
    { companyName: "", industry: "", yearsInCompany: "", roleInCompany: "" },
  ]);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastTitle, setToastTitle] = useState("");
  const [toastDescription, setToastDescription] = useState("");

  useEffect(() => {
    if (!user || user.type !== "talent") return;
    const t = user as TalentDetails;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFirstName(t.firstName ?? "");
    setLastName(t.lastName ?? "");
    setEmail(t.email ?? "");
    setPhoneNumber(t.phoneNumber ?? "");
    setAddressCity(t.address?.city ?? "");
    setAddressCountry(t.address?.country ?? "");
    setBio(t.bio ?? "");
    setSkillsProfile(t.skills ?? []);
    setLanguages(t.languages ?? []);
    setLinkedinUrl(t.linkedinUrl ?? "");
    setPortfolioUrl(t.portfolioUrl ?? "");
    setGithubUrl(t.githubUrl ?? "");
    setResumeUrl(t.resumeUrl ?? "");
    setAvailability(t.availableFrom ?? "");
    setDepartments(t.jobPosition.departments ?? []);
    setSeniority(t.jobPosition.seniority ?? "any");
    setEmploymentType(t.jobPosition.employmentType ?? "any");
    setWorkPreference(t.jobPosition.workPreference ?? "any");
    setPreferredCountry(t.jobPosition.country ?? "");
    setPreferredCity(t.jobPosition.city ?? "");
    setSalaryMin(t.jobPosition.salaryMin !== undefined ? String(t.jobPosition.salaryMin) : "");
    setCurrency(t.jobPosition.currency ?? "");
    setPriorities((t.priorities ?? []) as PriorityPreference[]);
    setCompensationPreferences((t.compensationPreferences ?? []) as CompensationPreference[]);
    if (t.experiences && t.experiences.length > 0) {
      setExperienceDrafts(
        t.experiences.map((e) => ({
          companyName: e.companyName ?? "",
          industry: e.industry ?? "",
          yearsInCompany: e.yearsInCompany !== undefined ? String(e.yearsInCompany) : "",
          roleInCompany: e.jobTitle ?? "",
        }))
      );
    }
  }, [user]);

  async function saveProfile() {
    if (!user || user.type !== "talent") return;
    const nextTalent = {
      ...(user as TalentDetails),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      fullName: `${firstName} ${lastName}`.trim(),
      email: email.trim(),
      phoneNumber: phoneNumber.trim(),
      bio: bio.trim(),
      skills: skillsProfile,
      languages: languages.length ? languages : undefined,
      linkedinUrl: linkedinUrl.trim() || undefined,
      portfolioUrl: portfolioUrl.trim() || undefined,
      githubUrl: githubUrl.trim() || undefined,
      resumeUrl: resumeUrl.trim() || undefined,
      address:
        addressCity.trim() || addressCountry
          ? { city: addressCity.trim() || undefined, country: addressCountry || undefined }
          : undefined,
      experiences:
        experienceDrafts.length
          ? experienceDrafts
              .map((exp) => ({
                companyName: exp.companyName.trim(),
                jobTitle: exp.roleInCompany.trim(),
                industry: exp.industry.trim() || undefined,
                yearsInCompany: exp.yearsInCompany ? Number(exp.yearsInCompany) : undefined,
              }))
              .filter((exp) => exp.companyName || exp.jobTitle)
              .map((exp) => ({
                id:
                  typeof crypto !== "undefined" && "randomUUID" in crypto
                    ? crypto.randomUUID()
                    : String(Date.now()),
                companyName: exp.companyName,
                jobTitle: exp.jobTitle,
                industry: exp.industry,
                employmentType: user.jobPosition.employmentType,
                yearsInCompany: exp.yearsInCompany,
              }))
          : undefined,
      availableFrom: availability || undefined,
      priorities: priorities.length ? priorities.slice(0, 3) : undefined,
      compensationPreferences: compensationPreferences.length
        ? compensationPreferences.slice(0, 3)
        : undefined,
      jobPosition: {
        ...user.jobPosition,
        departments: departments.slice(0, 4),
        seniority,
        employmentType,
        workPreference,
        country: preferredCountry || undefined,
        city: preferredCity.trim() || undefined,
        salaryMin: salaryMin.trim() === "" ? undefined : Number(salaryMin),
        currency: currency || undefined,
        equity: compensationPreferences.includes("Equity / stock options"),
      },
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
    } catch (err) {
      setToastTitle("Save failed");
      setToastDescription(err instanceof Error ? err.message : "Could not save profile to database.");
      setToastOpen(true);
      window.setTimeout(() => setToastOpen(false), 3000);
      return;
    }
    setToastTitle("Profile saved");
    setToastDescription("Your information was saved and queued for DB upsert.");
    setToastOpen(true);
    window.setTimeout(() => setToastOpen(false), 2800);
  }

  return (
    <main style={{ maxWidth: 980, margin: "0 auto" }}>
      <Toast open={toastOpen} status="success" title={toastTitle} description={toastDescription} />
      <FormSection title="Personal information">
        <FormRow>
          <FormField id="first-name" label="First name" required>
            {(field) => <Input {...field} value={firstName} onChange={(e) => setFirstName(e.target.value)} />}
          </FormField>
          <FormField id="last-name" label="Last name" required>
            {(field) => <Input {...field} value={lastName} onChange={(e) => setLastName(e.target.value)} />}
          </FormField>
        </FormRow>
        <FormRow>
          <FormField id="email" label="Email" required>
            {(field) => <Input {...field} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />}
          </FormField>
          <FormField id="phone" label="Phone number" required>
            {(field) => <Input {...field} type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />}
          </FormField>
        </FormRow>
        <FormRow>
          <FormField id="address-country" label="Address country" required>
            {(field) => (
              <Select {...field} value={addressCountry} onChange={(e) => setAddressCountry(e.target.value)}>
                <option value="" disabled>Select country</option>
                {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </Select>
            )}
          </FormField>
          <FormField id="address-city" label="Address city" required>
            {(field) => <Input {...field} value={addressCity} onChange={(e) => setAddressCity(e.target.value)} />}
          </FormField>
        </FormRow>
        <FormField id="bio" label="Bio" required>
          {(field) => <TextArea {...field} rows={4} value={bio} onChange={(e) => setBio(e.target.value)} />}
        </FormField>
      </FormSection>

      <Divider />

      <FormSection>
        <FormSection title="What are you looking for?">
          <FormRow columns={1}>
            <FormField id="departments" label="Departments (pick up to 4)" required>
              {() => (
                <MultiSelectDropdown
                  value={departments}
                  options={DEPARTMENTS.map((d) => ({ value: d, label: d }))}
                  placeholder="Select up to 4"
                  maxSelected={4}
                  onChange={(next) => setDepartments(next.slice(0, 4))}
                />
              )}
            </FormField>
          </FormRow>
          <FormRow>
            <FormField id="seniority" label="Seniority" required>
              {(field) => (
                <Select {...field} value={seniority} onChange={(e) => setSeniority(e.target.value as Seniority)}>
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
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value as EmploymentType)}
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
                  value={workPreference}
                  onChange={(e) => setWorkPreference(e.target.value as WorkPreference)}
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
            <FormField id="preferred-country" label="Country" required>
              {(field) => (
                <Select {...field} value={preferredCountry} onChange={(e) => setPreferredCountry(e.target.value)}>
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
            <FormField id="preferred-city" label="Preferred city (optional)">
              {(field) => (
                <Input {...field} value={preferredCity} onChange={(e) => setPreferredCity(e.target.value)} />
              )}
            </FormField>
          </FormRow>
          <FormRow>
            <FormField id="salary-min" label="Salary min" required>
              {(field) => (
                <Input
                  {...field}
                  type="number"
                  min={0}
                  value={salaryMin}
                  onChange={(e) => setSalaryMin(e.target.value)}
                />
              )}
            </FormField>
            <FormField id="currency" label="Currency" required>
              {(field) => (
                <Select {...field} value={currency} onChange={(e) => setCurrency(e.target.value)}>
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
        </FormSection>

        <Divider />

        <h3 style={{ margin: "20px 0 8px", fontSize: 20, lineHeight: "28px" }}>Skills</h3>

        <FormField id="skills" label="Skills" required>
          {() => <TagInput tags={skillsProfile} onChange={setSkillsProfile} placeholder="Type a skill and press Enter" maxTags={50} />}
        </FormField>
        <FormField id="languages" label="Languages (optional)">
          {() => (
            <MultiSelectDropdown
              value={languages}
              options={[
                { value: "English", label: "English" },
                { value: "Hebrew", label: "Hebrew" },
                { value: "Spanish", label: "Spanish" },
                { value: "French", label: "French" },
                { value: "German", label: "German" },
                { value: "Russian", label: "Russian" },
                { value: "Arabic", label: "Arabic" },
              ]}
              placeholder="Select languages"
              maxSelected={5}
              onChange={setLanguages}
            />
          )}
        </FormField>
        <FormRow>
          <FormField id="linkedin" label="LinkedIn URL (optional)">
            {(field) => <Input {...field} type="url" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} />}
          </FormField>
          <FormField id="portfolio" label="Portfolio URL (optional)">
            {(field) => <Input {...field} type="url" value={portfolioUrl} onChange={(e) => setPortfolioUrl(e.target.value)} />}
          </FormField>
        </FormRow>
        <FormRow>
          <FormField id="github" label="GitHub URL (optional)">
            {(field) => <Input {...field} type="url" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} />}
          </FormField>
          <FormField id="resume" label="Resume URL (optional)">
            {(field) => <Input {...field} type="url" value={resumeUrl} onChange={(e) => setResumeUrl(e.target.value)} />}
          </FormField>
        </FormRow>
      </FormSection>

      <Divider />

      <FormSection title="Experience">
        {experienceDrafts.map((exp, index) => (
          <div key={index} style={{ marginBottom: 16 }}>
            <FormRow>
              <FormField id={`exp-company-${index}`} label="Company name">
                {(field) => (
                  <Input
                    {...field}
                    value={exp.companyName}
                    onChange={(e) =>
                      setExperienceDrafts((prev) =>
                        prev.map((p, i) => (i === index ? { ...p, companyName: e.target.value } : p))
                      )
                    }
                  />
                )}
              </FormField>
              <FormField id={`exp-industry-${index}`} label="Industry">
                {(field) => (
                  <Input
                    {...field}
                    value={exp.industry}
                    onChange={(e) =>
                      setExperienceDrafts((prev) =>
                        prev.map((p, i) => (i === index ? { ...p, industry: e.target.value } : p))
                      )
                    }
                  />
                )}
              </FormField>
            </FormRow>
            <FormRow>
              <FormField id={`exp-years-${index}`} label="Years in company">
                {(field) => (
                  <Input
                    {...field}
                    type="number"
                    min={0}
                    value={exp.yearsInCompany}
                    onChange={(e) =>
                      setExperienceDrafts((prev) =>
                        prev.map((p, i) => (i === index ? { ...p, yearsInCompany: e.target.value } : p))
                      )
                    }
                  />
                )}
              </FormField>
              <FormField id={`exp-role-${index}`} label="Role in company">
                {(field) => (
                  <Input
                    {...field}
                    value={exp.roleInCompany}
                    onChange={(e) =>
                      setExperienceDrafts((prev) =>
                        prev.map((p, i) => (i === index ? { ...p, roleInCompany: e.target.value } : p))
                      )
                    }
                  />
                )}
              </FormField>
            </FormRow>
          </div>
        ))}
        <Button
          type="button"
          variant="secondary"
          onClick={() =>
            setExperienceDrafts((prev) => [
              ...prev,
              { companyName: "", industry: "", yearsInCompany: "", roleInCompany: "" },
            ])
          }
        >
          + Add experience
        </Button>

        <div style={{ marginTop: 16 }}>
          <Button
            type="button"
            onClick={saveProfile}
            disabled={
              !firstName.trim() ||
              !lastName.trim() ||
              !email.trim() ||
              !phoneNumber.trim() ||
              !addressCountry ||
              !addressCity.trim() ||
              !bio.trim() ||
              skillsProfile.length === 0
            }
          >
            Save / Submit
          </Button>
        </div>
      </FormSection>
    </main>
  );
}
