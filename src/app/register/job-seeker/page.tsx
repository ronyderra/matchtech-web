"use client";

import { useState, useEffect } from "react";
import {
  Breadcrumbs,
  Container,
  Section,
  Stack,
  FormSection,
  FormRow,
  FormField,
  Input,
  Select,
  Checkbox,
  Button,
  Stepper,
  FileUpload,
  FileListPreview,
  Modal,
  MultiSelectChips,
  MultiSelectDropdown,
} from "@/components/ui";
import type {
  JobPosition,
  TalentDetails,
  Seniority,
  EmploymentType,
  WorkPreference,
} from "@/types";
import { useUserStore } from "@/store";
import { extractTextFromPdf, PdfRejectError } from "@/lib/extract-pdf-text";
import { COUNTRIES, DEPARTMENTS, INDUSTRIES } from "@/constants/options";
import styles from "./page.module.css";

const STEPS = [
  { id: "whatLookingFor", label: "What are you looking for?" },
  { id: "cv", label: "Upload CV" },
  { id: "completeProfile", label: "Complete missing information" },
  { id: "image", label: "Upload image & background" },
  { id: "account", label: "Create account" },
];

const SENIORITY_OPTIONS: { value: Seniority; label: string }[] = [
  { value: "any", label: "Any" },
  { value: "junior", label: "Junior" },
  { value: "mid", label: "Mid-level" },
  { value: "senior", label: "Senior" },
  { value: "lead", label: "Lead" },
  { value: "principal", label: "Principal" },
];

const EMPLOYMENT_TYPE_OPTIONS: { value: EmploymentType; label: string }[] = [
  { value: "any", label: "Any" },
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

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function JobSeekerRegisterPage() {
  const setUser = useUserStore((s) => s.setUser);
  const [currentStep, setCurrentStep] = useState(0);
  const [jobPosition, setJobPosition] = useState<Omit<JobPosition, "id">>(defaultJobPosition);
  const [cvFiles, setCvFiles] = useState<File[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToCvExtraction, setAgreedToCvExtraction] = useState(false);
  const steps = STEPS;
  type BackgroundTheme = "blue" | "violet" | "teal" | "amber" | "rose" | "emerald";
  const [backgroundTheme, setBackgroundTheme] = useState<BackgroundTheme>("blue");
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);

  // Step 2: complete profile
  const [role, setRole] = useState("");
  const [yearsOfExperienceStr, setYearsOfExperienceStr] = useState("");
  const [skillsProfileRaw, setSkillsProfileRaw] = useState("");
  const [locationProfile, setLocationProfile] = useState("");

  // Step 4: account
  const [username, setUsername] = useState("");

  // PDF error popup (step 2)
  const [pdfError, setPdfError] = useState<string | null>(null);

  // Step 1: availability
  const [availability, setAvailability] = useState("");
  const [priorities, setPriorities] = useState<string[]>([]);
  const [compensationPreferences, setCompensationPreferences] = useState<string[]>([]);

  // Same gradient themes as hero section swipe cards (radial gradient)
  const THEME_GRADIENTS: Record<
    BackgroundTheme,
    { start: string; mid: string; end: string; label: string }
  > = {
    blue: {
      start: "rgba(10, 102, 194, 1)",
      mid: "rgba(23, 65, 102, 1)",
      end: "rgba(2, 6, 23, 1)",
      label: "Blue",
    },
    violet: {
      start: "rgba(124, 58, 237, 1)",
      mid: "rgba(76, 29, 149, 1)",
      end: "rgba(30, 27, 75, 1)",
      label: "Violet",
    },
    teal: {
      start: "rgba(20, 184, 166, 1)",
      mid: "rgba(15, 118, 110, 1)",
      end: "rgba(4, 47, 46, 1)",
      label: "Teal",
    },
    amber: {
      start: "rgba(245, 158, 11, 1)",
      mid: "rgba(180, 83, 9, 1)",
      end: "rgba(69, 26, 3, 1)",
      label: "Amber",
    },
    rose: {
      start: "rgba(244, 63, 94, 1)",
      mid: "rgba(190, 18, 60, 1)",
      end: "rgba(76, 5, 25, 1)",
      label: "Rose",
    },
    emerald: {
      start: "rgba(16, 185, 129, 1)",
      mid: "rgba(5, 150, 105, 1)",
      end: "rgba(6, 78, 59, 1)",
      label: "Emerald",
    },
  };

  const gradientStyle = (theme: BackgroundTheme) => ({
    backgroundImage: `radial-gradient(circle at 10% 0%, ${THEME_GRADIENTS[theme].start} 0%, ${THEME_GRADIENTS[theme].mid} 42%, ${THEME_GRADIENTS[theme].end} 100%)`,
  });

  // Create preview URL when user selects a photo; revoke on change or unmount
  useEffect(() => {
    if (imageFiles.length === 0) {
      queueMicrotask(() => setPhotoPreviewUrl(null));
      return;
    }
    const file = imageFiles[0];
    const url = URL.createObjectURL(file);
    queueMicrotask(() => setPhotoPreviewUrl(url));
    return () => URL.revokeObjectURL(url);
  }, [imageFiles]);

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  async function handleCompleteRegistration() {
    const skillsProfile = skillsProfileRaw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const jobPositionWithId: JobPosition = {
      ...jobPosition,
      id: crypto.randomUUID(),
    };
    jobPositionWithId.equity = compensationPreferences.includes("Equity / stock options")
      ? true
      : jobPositionWithId.equity;
    const yearsOfExperience = parseInt(yearsOfExperienceStr, 10) || 0;
    let avatarUrl = "";
    let imageUrl = "";
    if (imageFiles.length > 0) {
      const dataUrl = await fileToDataUrl(imageFiles[0]);
      avatarUrl = dataUrl;
      imageUrl = dataUrl;
    }
    const backgroundColor = THEME_GRADIENTS[backgroundTheme].start;

    const talent: TalentDetails = {
      id: username.trim() || crypto.randomUUID(),
      type: "talent",
      firstName: "",
      lastName: "",
      fullName: username.trim() || "User",
      avatarUrl,
      imageUrl,
      backgroundColor,
      role: role.trim() || "Professional",
      yearsOfExperience,
      employmentPreference: jobPosition.employmentType,
      country: jobPosition.country,
      city: jobPosition.city,
      workPreference: jobPosition.workPreference,
      bio: "",
      skills: skillsProfile.length > 0 ? skillsProfile : [],
      availableForWork: true,
      availableFrom: availability || undefined,
      jobPosition: jobPositionWithId,
      tags: [
        ...(priorities.length ? priorities.slice(0, 3) : []),
        ...(compensationPreferences.length ? compensationPreferences.slice(0, 3) : []),
      ].length
        ? [
            ...(priorities.length ? priorities.slice(0, 3) : []),
            ...(compensationPreferences.length ? compensationPreferences.slice(0, 3) : []),
          ]
        : undefined,
    };

    setUser(talent);
  }

  function handleNext() {
    if (isLastStep) {
      void handleCompleteRegistration();
      return;
    }
    setCurrentStep((s) => s + 1);
  }

  function handleBack() {
    setCurrentStep((s) => Math.max(0, s - 1));
  }

  function handleSkipCv() {
    setCurrentStep((s) => s + 1);
  }

  return (
    <Container>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
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
          description="Complete the steps below to create your account."
        >
          <Stack gap={32}>
            <Stepper steps={steps} currentIndex={currentStep} />

            {currentStep === 0 && (
              <FormSection title="What are you looking for?">
                <p
                  style={{
                    fontSize: "var(--font-size-body-sm)",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  Tell us what kind of role and setup you want so we can match you with the right opportunities. This maps to your desired job position.
                </p>
                <FormRow>
                  <FormField id="industry" label="Industry" required>
                    {(field) => (
                      <Select
                        {...field}
                        value={jobPosition.industry}
                        onChange={(e) =>
                          setJobPosition((prev) => ({ ...prev, industry: e.target.value }))
                        }
                      >
                        <option value="" disabled>Select industry</option>
                        {INDUSTRIES.map((industry) => (
                          <option key={industry} value={industry}>
                            {industry}
                          </option>
                        ))}
                      </Select>
                    )}
                  </FormField>
                  <FormField id="departments" label="Departments (pick up to 3)" required>
                    {() => (
                      <MultiSelectDropdown
                        value={jobPosition.departments ?? []}
                        options={DEPARTMENTS.map((d) => ({ value: d, label: d }))}
                        placeholder="Select up to 3"
                        maxSelected={3}
                        onChange={(next) =>
                          setJobPosition((prev) => ({
                            ...prev,
                            departments: next.slice(0, 3),
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
                      <Select
                        {...field}
                        value={availability}
                        onChange={(e) => setAvailability(e.target.value)}
                      >
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
                <FormField id="compensation-preferences" label="Which additional compensation matters to you? (pick up to 3)">
                  {() => (
                    <MultiSelectChips
                      value={compensationPreferences}
                      options={COMPENSATION_PREFERENCE_OPTIONS}
                      maxSelected={3}
                      onChange={(next) => {
                        const trimmed = next.slice(0, 3);
                        // If "Not important" is selected, it should be the only selection.
                        setCompensationPreferences(
                          trimmed.includes("Not important") ? ["Not important"] : trimmed
                        );
                      }}
                    />
                  )}
                </FormField>
                <FormField id="priorities" label="What matters most to you? (pick up to 3)">
                  {() => (
                    <MultiSelectChips
                      value={priorities}
                      options={PRIORITY_OPTIONS}
                      maxSelected={3}
                      onChange={(next) => setPriorities(next.slice(0, 3))}
                    />
                  )}
                </FormField>
                <Stack direction="row" gap={12} style={{ marginTop: 24 }}>
                  <Button
                    onClick={handleNext}
                    disabled={
                      !jobPosition.country ||
                      !jobPosition.departments?.length ||
                      jobPosition.salaryMin === undefined ||
                      !jobPosition.currency
                    }
                  >
                    Continue
                  </Button>
                </Stack>
              </FormSection>
            )}

            {currentStep === 1 && (
              <FormSection title="Upload your CV">
                <p
                  style={{
                    fontSize: "var(--font-size-body-sm)",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  We will extract as much information as we can from your CV (job title, experience, skills, location, and more) to build your profile card so you can be matched with relevant opportunities. If we can’t read something, we’ll ask you to fill it in later.
                </p>
                <FileUpload
                  label="CV / Resume"
                  description="Upload your CV or resume as a PDF only, in English. Max 3MB, 5 pages."
                  accept=".pdf,application/pdf"
                  onFilesSelected={(files) => {
                    const fileList = Array.from(files).filter(
                      (f) => f.type === "application/pdf"
                    );
                    if (fileList.length < Array.from(files).length) {
                      setPdfError("Only PDF files are accepted. Please upload a PDF.");
                    }
                    setCvFiles(fileList);
                    fileList.forEach((file) => {
                      extractTextFromPdf(file).catch((err) => {
                        const message =
                          err instanceof PdfRejectError
                            ? err.message
                            : err instanceof Error
                              ? err.message
                              : "This PDF could not be read. Please use a different file.";
                        setPdfError(message);
                        setCvFiles((prev) => prev.filter((f) => f !== file));
                      });
                    });
                  }}
                />
                <Modal
                  open={!!pdfError}
                  title="Problem with PDF"
                  description={pdfError ?? undefined}
                  primaryActionLabel="OK"
                  onPrimaryAction={() => setPdfError(null)}
                  onClose={() => setPdfError(null)}
                />
                {cvFiles.length > 0 && (
                  <FileListPreview
                    files={cvFiles}
                    variant="document"
                    onRemove={(_, index) => setCvFiles((prev) => prev.filter((_, i) => i !== index))}
                  />
                )}
                <Stack gap={8} style={{ marginTop: 12 }}>
                  <Checkbox
                    checked={agreedToCvExtraction}
                    onChange={(e) => setAgreedToCvExtraction(e.target.checked)}
                  >
                    I agree to allow MatchTech to extract information from my CV to create my profile card and improve my matches.
                  </Checkbox>
                </Stack>
                <Stack direction="row" gap={12} style={{ marginTop: 24 }}>
                  <Button type="button" variant="secondary" onClick={handleBack}>
                    Back
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!cvFiles.length || !agreedToCvExtraction}
                  >
                    Continue
                  </Button>
                </Stack>
                <p style={{ marginTop: 16, marginBottom: 0 }}>
                  <button
                    type="button"
                    onClick={handleSkipCv}
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      font: "inherit",
                      color: "var(--color-primary)",
                      cursor: "pointer",
                      textDecoration: "underline",
                      fontSize: "var(--font-size-body-sm)",
                    }}
                  >
                    I don’t have a CV – I’ll fill in my details in the next steps
                  </button>
                </p>
              </FormSection>
            )}

            {currentStep === 2 && (
              <FormSection title="Complete missing information">
                <p
                  style={{
                    fontSize: "var(--font-size-body-sm)",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {cvFiles.length > 0
                    ? "Review and fix the information below. We extracted this from your CV — correct anything that’s wrong or add what’s missing."
                    : "Fill in your profile so we can create your card. You can add or change this later."}
                </p>
                <FormField id="job-title" label="Job title / Role" required>
                  {(field) => (
                    <Input
                      {...field}
                      placeholder="e.g. Senior Frontend Engineer"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    />
                  )}
                </FormField>
                <FormField id="years-exp" label="Years of experience">
                  {(field) => (
                    <Input
                      {...field}
                      type="text"
                      placeholder="e.g. 5+"
                      value={yearsOfExperienceStr}
                      onChange={(e) => setYearsOfExperienceStr(e.target.value)}
                    />
                  )}
                </FormField>
                <FormField id="skills" label="Key skills (comma-separated)">
                  {(field) => (
                    <Input
                      {...field}
                      placeholder="e.g. React, TypeScript, Node.js"
                      value={skillsProfileRaw}
                      onChange={(e) => setSkillsProfileRaw(e.target.value)}
                    />
                  )}
                </FormField>
                <FormField id="location" label="Location / Region">
                  {(field) => (
                    <Input
                      {...field}
                      placeholder="e.g. Remote, Europe"
                      value={locationProfile}
                      onChange={(e) => setLocationProfile(e.target.value)}
                    />
                  )}
                </FormField>
                <Stack direction="row" gap={12} style={{ marginTop: 24 }}>
                  <Button type="button" variant="secondary" onClick={handleBack}>
                    Back
                  </Button>
                  <Button onClick={handleNext}>Continue</Button>
                </Stack>
              </FormSection>
            )}

            {currentStep === 3 && (
              <FormSection title="Upload your photo & choose background">
                <div className={styles.step3Layout}>
                  <div className={styles.step3Form}>
                    <FileUpload
                      label="Your photo"
                      description="A clear headshot or professional photo. JPG or PNG. Max 5MB."
                      accept=".jpg,.jpeg,.png,.webp"
                      onFilesSelected={(files) => setImageFiles(Array.from(files))}
                    />
                    {imageFiles.length > 0 && (
                      <FileListPreview
                        files={imageFiles}
                        variant="image"
                        onRemove={(_, index) => setImageFiles((prev) => prev.filter((_, i) => i !== index))}
                      />
                    )}

                    <div style={{ marginTop: 20 }}>
                      <label
                        style={{
                          display: "block",
                          fontSize: "var(--font-size-body-sm)",
                          fontWeight: 500,
                          color: "var(--color-text-primary)",
                          marginBottom: 10,
                        }}
                      >
                        Background color
                      </label>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 10,
                          alignItems: "center",
                        }}
                      >
                        {(Object.keys(THEME_GRADIENTS) as BackgroundTheme[]).map((theme) => (
                          <button
                            key={theme}
                            type="button"
                            title={THEME_GRADIENTS[theme].label}
                            aria-label={`${THEME_GRADIENTS[theme].label} background`}
                            onClick={() => setBackgroundTheme(theme)}
                            style={{
                              width: 40,
                              height: 40,
                              borderRadius: 12,
                              ...gradientStyle(theme),
                              border:
                                backgroundTheme === theme
                                  ? "3px solid var(--color-primary)"
                                  : "2px solid var(--color-border)",
                              boxShadow:
                                backgroundTheme === theme
                                  ? "0 0 0 1px var(--color-primary)"
                                  : "0 2px 6px rgba(0,0,0,0.12)",
                              cursor: "pointer",
                              padding: 0,
                            }}
                          />
                        ))}
                      </div>
                      <p style={{ fontSize: 12, color: "var(--color-text-muted)", marginTop: 6 }}>
                        Same gradient styles as the hero cards on the homepage.
                      </p>
                    </div>
                  </div>

                  <div className={styles.step3Preview}>
                    <p
                      style={{
                        fontSize: "var(--font-size-body-sm)",
                        fontWeight: 500,
                        color: "var(--color-text-primary)",
                        marginBottom: 10,
                      }}
                    >
                      Preview
                    </p>
                    <div
                      style={{
                        width: "100%",
                        maxWidth: 320,
                        paddingBottom: 56,
                        overflow: "visible",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          aspectRatio: "420 / 200",
                          borderRadius: 16,
                          ...gradientStyle(backgroundTheme),
                          position: "relative",
                          overflow: "visible",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            left: "50%",
                            bottom: -40,
                            transform: "translateX(-50%)",
                            width: 96,
                            height: 96,
                            borderRadius: "50%",
                            backgroundColor: "var(--color-surface)",
                            border: "5px solid var(--color-surface)",
                            boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                            overflow: "hidden",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {photoPreviewUrl ? (
                            <img
                              src={photoPreviewUrl}
                              alt="Your photo preview"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <span
                              style={{
                                fontSize: 32,
                                color: "var(--color-text-muted)",
                                fontWeight: 600,
                              }}
                            >
                              ?
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <p style={{ fontSize: 12, color: "var(--color-text-muted)", marginTop: 8 }}>
                      This is how your profile will look with your photo and chosen background.
                    </p>
                  </div>
                </div>

                <Stack direction="row" gap={12} style={{ marginTop: 24 }}>
                  <Button type="button" variant="secondary" onClick={handleBack}>
                    Back
                  </Button>
                  <Button onClick={handleNext}>Continue</Button>
                </Stack>
              </FormSection>
            )}

            {currentStep === 4 && (
              <FormSection title="Create account">
                <p
                  style={{
                    fontSize: "var(--font-size-body-sm)",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  Choose a username and password to sign in to your account.
                </p>
                <FormField id="username" label="Username" required>
                  {(field) => (
                    <Input
                      {...field}
                      placeholder="Choose a username"
                      autoComplete="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  )}
                </FormField>
                <FormRow>
                  <FormField id="password" label="Password" required>
                    {(field) => (
                      <Input {...field} type="password" placeholder="Choose a password" autoComplete="new-password" />
                    )}
                  </FormField>
                  <FormField id="confirm-password" label="Confirm password" required>
                    {(field) => (
                      <Input {...field} type="password" placeholder="Confirm password" autoComplete="new-password" />
                    )}
                  </FormField>
                </FormRow>
                <Stack gap={8} style={{ marginTop: 8 }}>
                  <Checkbox
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                  >
                    I agree to the Terms of Service and Privacy Policy
                  </Checkbox>
                </Stack>
                <Stack direction="row" gap={12} style={{ marginTop: 24 }}>
                  <Button type="button" variant="secondary" onClick={handleBack}>
                    Back
                  </Button>
                  <Button onClick={handleNext}>Complete registration</Button>
                </Stack>
              </FormSection>
            )}
          </Stack>
        </Section>
      </div>
    </Container>
  );
}
