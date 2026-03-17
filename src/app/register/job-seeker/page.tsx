"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
  TextArea,
  TagInput,
  Divider,
  ProgressBar,
  Toast,
} from "@/components/ui";
import type {
  JobPosition,
  TalentDetails,
  Seniority,
  EmploymentType,
  WorkPreference,
  PriorityPreference,
  CompensationPreference,
} from "@/types";
import { useUserStore } from "@/store";
import { extractTextFromPdf, PdfRejectError } from "@/lib/extract-pdf-text";
import { COUNTRIES, DEPARTMENTS } from "@/constants/options";
import styles from "./page.module.css";

const IS_DEV = process.env.NODE_ENV === "development";

const STEPS = [
  { id: "image", label: "Upload image & background" },
  { id: "whatLookingFor", label: "What are you looking for?" },
  { id: "completeProfile", label: "CV & profile" },
  { id: "account", label: "Create account" },
];

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

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function JobSeekerRegisterPage() {
  const router = useRouter();
  const user = useUserStore((s) => s.user);
  const initDraft = useUserStore((s) => s.initDraft);
  const patchUser = useUserStore((s) => s.patchUser);
  const setUser = useUserStore((s) => s.setUser);
  const [currentStep, setCurrentStep] = useState(0);
  const [jobPosition, setJobPosition] = useState<Omit<JobPosition, "id">>(defaultJobPosition);
  const [cvFiles, setCvFiles] = useState<File[]>([]);
  const [cvEntryMode, setCvEntryMode] = useState<"cv" | "manual">("cv");
  const [cvParsed, setCvParsed] = useState(false);
  const [cvUploadVisible, setCvUploadVisible] = useState(true);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToCvExtraction, setAgreedToCvExtraction] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const steps = STEPS;
  type BackgroundTheme = "blue" | "violet" | "teal" | "amber" | "rose" | "emerald";
  const [backgroundTheme, setBackgroundTheme] = useState<BackgroundTheme>("blue");
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);

  // Step 2: complete profile
  const [yearsOfExperienceStr] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [skillsProfile, setSkillsProfile] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressCountry, setAddressCountry] = useState("");

  // Experience (step 3)
  type ExperienceDraft = {
    companyName: string;
    industry: string;
    yearsInCompany: string;
    roleInCompany: string;
  };
  const [experienceDrafts, setExperienceDrafts] = useState<ExperienceDraft[]>([
    { companyName: "", industry: "", yearsInCompany: "", roleInCompany: "" },
  ]);

  // PDF error popup (step 2)
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [cvProcessing, setCvProcessing] = useState(false);
  const [cvProgress, setCvProgress] = useState(0);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastStatus, setToastStatus] = useState<"success" | "error" | "info">("info");
  const [toastTitle, setToastTitle] = useState("");
  const [toastDescription, setToastDescription] = useState("");

  function showToast(status: "success" | "error" | "info", title: string, description?: string) {
    setToastStatus(status);
    setToastTitle(title);
    setToastDescription(description ?? "");
    setToastOpen(true);
    window.setTimeout(() => setToastOpen(false), 4500);
  }

  async function postWithTimeout(url: string, body: unknown, timeoutMs: number) {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      const text = await res.text();
      return { ok: res.ok, status: res.status, text };
    } finally {
      window.clearTimeout(timeout);
    }
  }

  // Smooth progress animation while processing (avoids big jumps)
  useEffect(() => {
    if (!cvProcessing) return;
    const id = window.setInterval(() => {
      setCvProgress((p) => {
        if (p >= 92) return p; // leave room for real completion
        const step = p < 30 ? 3 : p < 60 ? 2 : 1;
        return Math.min(92, p + step);
      });
    }, 180);
    return () => window.clearInterval(id);
  }, [cvProcessing]);

  // Step 1: availability
  const [availability, setAvailability] = useState("");
  const [priorities, setPriorities] = useState<PriorityPreference[]>([]);
  const [compensationPreferences, setCompensationPreferences] = useState<CompensationPreference[]>([]);

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

  const didHydrateRef = useRef(false);
  useEffect(() => {
    initDraft("talent");
  }, [initDraft]);

  // Hydrate local form state once from persisted draft
  useEffect(() => {
    if (didHydrateRef.current) return;
    if (!user || user.type !== "talent") return;

    const t = user as TalentDetails;
    didHydrateRef.current = true;

    // Step 0
    if (t.jobPosition) {
      const { id: _id, ...jp } = t.jobPosition;
      setJobPosition({
        ...defaultJobPosition,
        ...jp,
      });
    }
    setAvailability(t.availableFrom ?? "");
    setPriorities((t.priorities ?? []) as PriorityPreference[]);
    setCompensationPreferences((t.compensationPreferences ?? []) as CompensationPreference[]);

    // Step 1/2
    setFirstName(t.firstName ?? "");
    setLastName(t.lastName ?? "");
    setEmail(t.email ?? "");
    setPhoneNumber(t.phoneNumber ?? "");
    setBio(t.bio ?? "");
    setSkillsProfile(t.skills ?? []);
    setLanguages((t.languages ?? []) as string[]);
    setLinkedinUrl(t.linkedinUrl ?? "");
    setPortfolioUrl(t.portfolioUrl ?? "");
    setGithubUrl(t.githubUrl ?? "");
    setResumeUrl(t.resumeUrl ?? "");
    setAddressCity(t.address?.city ?? "");
    setAddressCountry(t.address?.country ?? "");

    // Experiences (used in the UI as drafts)
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

    // Step 3
    if (t.imageUrl) {
      queueMicrotask(() => setPhotoPreviewUrl(t.imageUrl));
    }
    const themeMatch = (Object.keys(THEME_GRADIENTS) as BackgroundTheme[]).find(
      (k) => THEME_GRADIENTS[k].start === t.backgroundColor
    );
    if (themeMatch) setBackgroundTheme(themeMatch);

    setAgreedToTerms(false);
    setAgreedToCvExtraction(false);
  }, [user]);

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

  const isLastStep = currentStep === steps.length - 1;

  async function handleCompleteRegistration() {
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
    const fullName = `${firstName} ${lastName}`.trim() || email.trim().split("@")[0] || "User";

    const experiences = experienceDrafts
      .map((exp) => ({
        companyName: exp.companyName.trim(),
        roleInCompany: exp.roleInCompany.trim(),
        industry: exp.industry.trim() || undefined,
        yearsInCompany: exp.yearsInCompany ? Number(exp.yearsInCompany) : undefined,
      }))
      .filter((exp) => exp.companyName || exp.roleInCompany);

    const id =
      user?.type === "talent"
        ? user.id
        : typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : String(Date.now());

    const talent: TalentDetails = {
      id,
      type: "talent",
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      fullName,
      avatarUrl,
      imageUrl,
      backgroundColor,
      role: jobPosition.departments?.[0]?.trim() || "Professional",
      yearsOfExperience,
      employmentPreference: jobPosition.employmentType,
      country: jobPosition.country,
      city: jobPosition.city,
      workPreference: jobPosition.workPreference,
      bio: bio.trim(),
      skills: skillsProfile,
      languages: languages.length ? languages : undefined,
      linkedinUrl: linkedinUrl.trim() || undefined,
      portfolioUrl: portfolioUrl.trim() || undefined,
      githubUrl: githubUrl.trim() || undefined,
      resumeUrl: resumeUrl.trim() || undefined,
      email: email.trim(),
      phoneNumber: phoneNumber.trim(),
      address:
        addressCity.trim() ||
        addressCountry
          ? {
              city: addressCity.trim() || undefined,
              country: addressCountry || undefined,
            }
          : undefined,
      availableForWork: true,
      availableFrom: availability || undefined,
      priorities: priorities.length ? priorities.slice(0, 3) : undefined,
      compensationPreferences: compensationPreferences.length
        ? compensationPreferences.slice(0, 3)
        : undefined,
      jobPosition: jobPositionWithId,
      experiences: experiences.length
        ? experiences.map((exp) => ({
            id: crypto.randomUUID(),
            companyName: exp.companyName,
            jobTitle: exp.roleInCompany,
            industry: exp.industry,
            employmentType: jobPosition.employmentType,
            yearsInCompany: exp.yearsInCompany,
          }))
        : undefined,
      tags: undefined,
    };

    setUser(talent);
  }

  function saveStepToDraft(stepIndex: number) {
    if (user?.type !== "talent") return;

    if (stepIndex === 0) {
      patchUser({
        type: "talent",
        backgroundColor: THEME_GRADIENTS[backgroundTheme].start,
      });
      return;
    }

    if (stepIndex === 1) {
      patchUser({
        type: "talent",
        availableFrom: availability || undefined,
        priorities: priorities.length ? priorities.slice(0, 3) : undefined,
        compensationPreferences: compensationPreferences.length
          ? compensationPreferences.slice(0, 3)
          : undefined,
        jobPosition: {
          ...jobPosition,
        } as any,
      });
      return;
    }

    if (stepIndex === 2) {
      patchUser({
        type: "talent",
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`.trim(),
        bio,
        skills: skillsProfile,
        languages: languages.length ? languages : undefined,
        linkedinUrl: linkedinUrl.trim() || undefined,
        portfolioUrl: portfolioUrl.trim() || undefined,
        githubUrl: githubUrl.trim() || undefined,
        resumeUrl: resumeUrl.trim() || undefined,
        email,
        phoneNumber,
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
                  employmentType: jobPosition.employmentType,
                  yearsInCompany: exp.yearsInCompany,
                }))
            : undefined,
      });
      return;
    }
  }

  function handleNext() {
    saveStepToDraft(currentStep);
    if (isLastStep) {
      void handleCompleteRegistration().then(() => {
        router.push("/register/thank-you");
      });
      return;
    }
    setCurrentStep((s) => s + 1);
  }

  function handleBack() {
    setCurrentStep((s) => Math.max(0, s - 1));
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
            <Toast
              open={toastOpen}
              status={toastStatus}
              title={toastTitle}
              description={toastDescription || undefined}
            />
            <Stepper steps={steps} currentIndex={currentStep} />

            {currentStep === 0 && (
              <FormSection title="Upload your photo & choose background">
                <div className={styles.step3Layout}>
                  <div className={styles.step3Form}>
                    <FileUpload
                      label="Your photo"
                      description="A clear headshot or professional photo. JPG or PNG. Max 5MB."
                      accept=".jpg,.jpeg,.png,.webp"
                      onFilesSelected={(files) => {
                        const next = Array.from(files);
                        setImageFiles(next);
                        const file = next[0];
                        if (!file) return;
                        fileToDataUrl(file)
                          .then((dataUrl) => {
                            patchUser({ type: "talent", avatarUrl: dataUrl, imageUrl: dataUrl });
                          })
                          .catch(() => {});
                      }}
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
                            onClick={() => {
                              setBackgroundTheme(theme);
                              patchUser({
                                type: "talent",
                                backgroundColor: THEME_GRADIENTS[theme].start,
                              });
                            }}
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

                <div className={styles.buttonRow}>
                <Stack direction="row" gap={12}>
                  <Link href="/" style={{ textDecoration: "none" }}>
                    <Button
                      type="button"
                      variant="secondary"
                      style={{
                        backgroundColor: "var(--color-surface)",
                        border: "1px solid var(--color-border)",
                        color: "var(--color-text-primary)",
                      }}
                    >
                      Go back home
                    </Button>
                  </Link>
                  <Button onClick={handleNext}>Continue</Button>
                </Stack>
                </div>
              </FormSection>
            )}

            {currentStep === 1 && (
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
                          // If "Not important" is selected, it should be the only selection.
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
                <div className={styles.buttonRow}>
                <Stack direction="row" gap={12}>
                  <Button type="button" variant="secondary" onClick={handleBack}>
                    Back
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={
                      !IS_DEV &&
                      (!jobPosition.country ||
                        !jobPosition.departments?.length ||
                        jobPosition.salaryMin === undefined ||
                        !jobPosition.currency)
                    }
                  >
                    Continue
                  </Button>
                </Stack>
                </div>
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
                  {cvEntryMode === "cv" && cvFiles.length > 0
                    ? "Review and fix the information below. We extracted this from your CV — correct anything that’s wrong or add what’s missing."
                    : "Fill in your profile so we can create your card. You can add or change this later."}
                </p>

                {cvEntryMode === "cv" && cvUploadVisible ? (
                <FormSection title="Upload your CV">
                  <p
                    style={{
                      fontSize: "var(--font-size-body-sm)",
                      color: "var(--color-text-secondary)",
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    Upload a PDF resume and we&apos;ll extract what we can to prefill your profile.
                  </p>
                  <FileUpload
                    label="CV / Resume"
                    description="PDF ONLY • English • Max 3MB • Max 5 pages"
                    accept=".pdf,application/pdf"
                    onFilesSelected={(files) => {
                      setCvParsed(false);
                      const fileList = Array.from(files).filter((f) => f.type === "application/pdf");
                      if (fileList.length < Array.from(files).length) {
                        setPdfError("Only PDF files are accepted. Please upload a PDF.");
                      }
                      setCvFiles(fileList);
                      const file = fileList[0];
                      if (!file) return;
                      setCvProcessing(true);
                      setCvProgress(3);
                      showToast("info", "Processing CV", "Extracting text from your PDF…");
                      extractTextFromPdf(file)
                        .then(async (fullText) => {
                          const result = await postWithTimeout(
                            "/api/openai",
                            { CV: fullText, fileName: file.name },
                            15000
                          );
                          if (!result.ok) {
                            throw new Error(`OpenAI proxy returned ${result.status}`);
                          }
                          console.log("[CV parse response]", result.text);

                          try {
                            const responseJson = JSON.parse(result.text) as any;
                            const parsed =
                              responseJson && typeof responseJson === "object" && "firstName" in responseJson
                                ? responseJson
                                : (() => {
                                    const maybeOutputText =
                                      typeof responseJson?.output_text === "string"
                                        ? responseJson.output_text
                                        : responseJson?.output?.[0]?.content?.find?.(
                                            (c: any) =>
                                              c?.type === "output_text" && typeof c?.text === "string"
                                          )?.text;
                                    return JSON.parse(String(maybeOutputText ?? "{}"));
                                  })();

                            const nextFirst = parsed?.firstName ?? null;
                            const nextLast = parsed?.lastName ?? null;
                            const nextEmail = parsed?.email ?? null;
                            const nextPhone = parsed?.phone ?? null;
                            const nextCountry = parsed?.country ?? null;
                            const nextCity = parsed?.city ?? null;
                            const nextBio = parsed?.bio ?? null;
                            const nextLinkedin = parsed?.linkedin ?? null;
                            const nextPortfolio = parsed?.portfolio ?? null;
                            const nextGithub = parsed?.github ?? null;
                            const nextResumeUrl = parsed?.resumeUrl ?? null;
                            const nextSkills = Array.isArray(parsed?.skills) ? parsed.skills : [];
                            const nextLanguages = Array.isArray(parsed?.languages) ? parsed.languages : [];

                            if (nextFirst) setFirstName(String(nextFirst));
                            if (nextLast) setLastName(String(nextLast));
                            if (nextEmail) setEmail(String(nextEmail));
                            if (nextPhone) setPhoneNumber(String(nextPhone));
                            if (nextCity) setAddressCity(String(nextCity));
                            if (nextCountry) setAddressCountry(String(nextCountry));
                            if (nextBio) setBio(String(nextBio));
                            if (nextLinkedin) setLinkedinUrl(String(nextLinkedin));
                            if (nextPortfolio) setPortfolioUrl(String(nextPortfolio));
                            if (nextGithub) setGithubUrl(String(nextGithub));
                            if (typeof nextResumeUrl === "string") setResumeUrl(nextResumeUrl);
                            if (nextSkills.length) setSkillsProfile(nextSkills.map(String));
                            if (nextLanguages.length) setLanguages(nextLanguages.map(String));

                            if (Array.isArray(parsed?.experience)) {
                              const drafts = parsed.experience
                                .map((e: any) => ({
                                  companyName: e?.companyName ? String(e.companyName) : "",
                                  industry: e?.industry ? String(e.industry) : "",
                                  yearsInCompany:
                                    typeof e?.years === "number" && Number.isFinite(e.years)
                                      ? String(e.years)
                                      : "",
                                  roleInCompany: e?.role ? String(e.role) : "",
                                }))
                                .filter(
                                  (e: any) =>
                                    e.companyName || e.industry || e.yearsInCompany || e.roleInCompany
                                );
                              setExperienceDrafts(
                                drafts.length
                                  ? drafts
                                  : [{ companyName: "", industry: "", yearsInCompany: "", roleInCompany: "" }]
                              );
                            }

                            patchUser({
                              type: "talent",
                              firstName: nextFirst ? String(nextFirst) : user?.type === "talent" ? user.firstName : "",
                              lastName: nextLast ? String(nextLast) : user?.type === "talent" ? user.lastName : "",
                              fullName: `${nextFirst ?? ""} ${nextLast ?? ""}`.trim(),
                              email: nextEmail ? String(nextEmail) : undefined,
                              phoneNumber: nextPhone ? String(nextPhone) : undefined,
                              bio: nextBio ? String(nextBio) : undefined,
                              linkedinUrl: nextLinkedin ? String(nextLinkedin) : undefined,
                              portfolioUrl: nextPortfolio ? String(nextPortfolio) : undefined,
                              githubUrl: nextGithub ? String(nextGithub) : undefined,
                              resumeUrl: typeof nextResumeUrl === "string" ? nextResumeUrl : undefined,
                              skills: nextSkills.map(String),
                              languages: nextLanguages.map(String),
                              address:
                                nextCity || nextCountry
                                  ? {
                                      city: nextCity ? String(nextCity) : undefined,
                                      country: nextCountry ? String(nextCountry) : undefined,
                                    }
                                  : undefined,
                              experiences: Array.isArray(parsed?.experience)
                                ? parsed.experience.map((e: any) => ({
                                    id:
                                      typeof crypto !== "undefined" && "randomUUID" in crypto
                                        ? crypto.randomUUID()
                                        : String(Date.now()),
                                    companyName: e?.companyName ? String(e.companyName) : "",
                                    jobTitle: e?.role ? String(e.role) : "",
                                    industry: e?.industry ? String(e.industry) : undefined,
                                    employmentType: jobPosition.employmentType,
                                    yearsInCompany:
                                      typeof e?.years === "number" && Number.isFinite(e.years)
                                        ? e.years
                                        : undefined,
                                  }))
                                : undefined,
                            } as any);
                          } catch {
                            // If parsing fails, keep going; user can fill manually.
                          }

                          setCvProgress(100);
                          setCvParsed(true);
                          setCvUploadVisible(false);
                          showToast("success", "CV processed", "Data extracted successfully.");
                        })
                        .catch((err) => {
                          const isAbort = err instanceof DOMException && err.name === "AbortError";
                          const message =
                            isAbort
                              ? "We couldn’t get a response in time. Please continue and fill details manually."
                              : err instanceof PdfRejectError
                                ? err.message
                                : err instanceof Error
                                  ? err.message
                                  : "There was a problem processing your CV. Please continue manually.";
                          showToast("error", "CV processing failed", message);
                          setCvFiles((prev) => prev.filter((f) => f !== file));
                        })
                        .finally(() => {
                          setCvProcessing(false);
                          window.setTimeout(() => setCvProgress(0), 400);
                        });
                    }}
                  />
                  {cvProcessing ? (
                    <div style={{ marginTop: 12 }}>
                      <ProgressBar value={Math.max(5, cvProgress)} max={100} label="Processing…" />
                    </div>
                  ) : null}
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
                  {cvFiles.length > 0 && !cvParsed ? (
                    <Stack gap={8} style={{ marginTop: 12 }}>
                      <Checkbox
                        checked={agreedToCvExtraction}
                        onChange={(e) => setAgreedToCvExtraction(e.target.checked)}
                      >
                        I agree to allow MatchTech AI to extract information from my CV to create my profile card and
                        improve my matches.
                      </Checkbox>
                    </Stack>
                  ) : null}

                  <p style={{ marginTop: 16, marginBottom: 0 }}>
                    <button
                      type="button"
                      onClick={() => {
                        setCvEntryMode("manual");
                        setCvUploadVisible(false);
                        setCvParsed(false);
                        setCvFiles([]);
                        setAgreedToCvExtraction(false);
                      }}
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
                      I don&apos;t have a CV — I&apos;ll fill manually
                    </button>
                  </p>
                </FormSection>
                ) : null}

                {cvEntryMode === "cv" && cvParsed && !cvUploadVisible ? (
                  <div style={{ marginTop: 4 }}>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => {
                        setCvUploadVisible(true);
                        setCvParsed(false);
                        setAgreedToCvExtraction(false);
                        setCvFiles([]);
                      }}
                    >
                      Replace CV
                    </Button>
                  </div>
                ) : null}

                {cvEntryMode === "manual" ? (
                  <p style={{ marginTop: 4, marginBottom: 0 }}>
                    <button
                      type="button"
                      onClick={() => {
                        setCvEntryMode("cv");
                        setCvUploadVisible(true);
                        setCvParsed(false);
                        setAgreedToCvExtraction(false);
                        setCvFiles([]);
                      }}
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
                      Upload a CV instead
                    </button>
                  </p>
                ) : null}

                {cvEntryMode === "manual" || (cvEntryMode === "cv" && cvParsed) ? (
                <>
                  <FormSection
                    title="Personal information"
                    description="Basic details to build your profile card."
                  >
                <FormRow>
                  <FormField id="first-name" label="First name" required>
                    {(field) => (
                      <Input
                        {...field}
                        placeholder="e.g. Alex"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    )}
                  </FormField>
                  <FormField id="last-name" label="Last name" required>
                    {(field) => (
                      <Input
                        {...field}
                        placeholder="e.g. Johnson"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    )}
                  </FormField>
                </FormRow>

                <FormRow>
                  <FormField id="email" label="Email" required>
                    {(field) => (
                      <Input
                        {...field}
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    )}
                  </FormField>
                  <FormField id="phone" label="Phone number" required>
                    {(field) => (
                      <Input
                        {...field}
                        type="tel"
                        placeholder="+1 555 123 4567"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    )}
                  </FormField>
                </FormRow>

                <FormRow>
                  <FormField id="address-country" label="Address country" required>
                    {(field) => (
                      <Select
                        {...field}
                        value={addressCountry}
                        onChange={(e) => setAddressCountry(e.target.value)}
                      >
                        <option value="" disabled>
                          Select country
                        </option>
                        {COUNTRIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </Select>
                    )}
                  </FormField>
                  <FormField id="address-city" label="Address city" required>
                    {(field) => (
                      <Input
                        {...field}
                        placeholder="City"
                        value={addressCity}
                        onChange={(e) => setAddressCity(e.target.value)}
                      />
                    )}
                  </FormField>
                </FormRow>
                <FormField id="bio" label="Bio" required>
                  {(field) => (
                    <TextArea
                      {...field}
                      placeholder="A short summary about you, what you’ve done, and what you’re looking for."
                      rows={4}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                  )}
                </FormField>
                </FormSection>

                <Divider />

                <FormSection
                  title="Experience"
                  description="Your past roles (optional for now)."
                >
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
                                  prev.map((p, i) =>
                                    i === index ? { ...p, companyName: e.target.value } : p
                                  )
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
                                  prev.map((p, i) =>
                                    i === index ? { ...p, industry: e.target.value } : p
                                  )
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
                                  prev.map((p, i) =>
                                    i === index ? { ...p, yearsInCompany: e.target.value } : p
                                  )
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
                                  prev.map((p, i) =>
                                    i === index ? { ...p, roleInCompany: e.target.value } : p
                                  )
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
                </FormSection>

                <Divider />

                <FormSection
                  title="Skills"
                  description="Your core skills and strengths."
                >
                  <FormField id="skills" label="Skills" required>
                    {() => (
                      <TagInput
                        tags={skillsProfile}
                        onChange={setSkillsProfile}
                        placeholder="Type a skill and press Enter"
                        maxTags={50}
                      />
                    )}
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
                </FormSection>

                <Divider />

                <FormSection title="Links" description="Optional links to your work and profiles.">
                  <FormField id="linkedin" label="LinkedIn URL (optional)">
                    {(field) => (
                      <Input
                        {...field}
                        type="url"
                        placeholder="https://www.linkedin.com/in/username"
                        value={linkedinUrl}
                        onChange={(e) => setLinkedinUrl(e.target.value)}
                      />
                    )}
                  </FormField>
                  <FormField id="portfolio" label="Portfolio URL (optional)">
                    {(field) => (
                      <Input
                        {...field}
                        type="url"
                        placeholder="https://your-portfolio.com"
                        value={portfolioUrl}
                        onChange={(e) => setPortfolioUrl(e.target.value)}
                      />
                    )}
                  </FormField>
                  <FormRow>
                    <FormField id="github" label="GitHub URL (optional)">
                      {(field) => (
                        <Input
                          {...field}
                          type="url"
                          placeholder="https://github.com/username"
                          value={githubUrl}
                          onChange={(e) => setGithubUrl(e.target.value)}
                        />
                      )}
                    </FormField>
                    <FormField id="resume" label="Resume URL (optional)">
                      {(field) => (
                        <Input
                          {...field}
                          type="url"
                          placeholder="Link to your resume (optional)"
                          value={resumeUrl}
                          onChange={(e) => setResumeUrl(e.target.value)}
                        />
                      )}
                    </FormField>
                  </FormRow>
                </FormSection>
                </>
                ) : null}
                <div className={styles.buttonRow}>
                <Stack direction="row" gap={12}>
                  <Button type="button" variant="secondary" onClick={handleBack}>
                    Back
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={
                      !IS_DEV &&
                      ((cvEntryMode === "cv" && cvFiles.length > 0 && !cvParsed && !agreedToCvExtraction) ||
                      (!firstName.trim() ||
                        !lastName.trim() ||
                        !email.trim() ||
                        !phoneNumber.trim() ||
                        !addressCountry ||
                        !addressCity.trim() ||
                        !bio.trim() ||
                        skillsProfile.length === 0))
                    }
                  >
                    Continue
                  </Button>
                </Stack>
                </div>
              </FormSection>
            )}

            {currentStep === 3 && (
              <FormSection title="Create account">
                <p
                  style={{
                    fontSize: "var(--font-size-body-sm)",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  Use your email and a password to sign in to your account. Password must be at least 6 characters and include 1 capital letter and 1 number.
                </p>
                <FormField id="account-email" label="Email" required>
                  {(field) => (
                    <Input
                      {...field}
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  )}
                </FormField>
                <FormRow>
                  <FormField id="password" label="Password" required>
                    {(field) => (
                      <div style={{ position: "relative" }}>
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Choose a password"
                          autoComplete="new-password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          style={{ paddingRight: 84 }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((v) => !v)}
                          style={{
                            position: "absolute",
                            right: 10,
                            top: "50%",
                            transform: "translateY(-50%)",
                            border: "1px solid var(--color-border)",
                            background: "var(--color-surface)",
                            color: "var(--color-text-secondary)",
                            borderRadius: 999,
                            padding: "6px 10px",
                            fontSize: 12,
                            cursor: "pointer",
                          }}
                        >
                          {showPassword ? "Hide" : "Show"}
                        </button>
                      </div>
                    )}
                  </FormField>
                  <FormField id="confirm-password" label="Confirm password" required>
                    {(field) => (
                      <div style={{ position: "relative" }}>
                        <Input
                          {...field}
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm password"
                          autoComplete="new-password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          style={{ paddingRight: 84 }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword((v) => !v)}
                          style={{
                            position: "absolute",
                            right: 10,
                            top: "50%",
                            transform: "translateY(-50%)",
                            border: "1px solid var(--color-border)",
                            background: "var(--color-surface)",
                            color: "var(--color-text-secondary)",
                            borderRadius: 999,
                            padding: "6px 10px",
                            fontSize: 12,
                            cursor: "pointer",
                          }}
                        >
                          {showConfirmPassword ? "Hide" : "Show"}
                        </button>
                      </div>
                    )}
                  </FormField>
                </FormRow>
                <Stack gap={8} style={{ marginTop: 8 }}>
                  <Checkbox
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                  >
                    I agree to the{" "}
                    <Link href="/terms" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>
                      Privacy Policy
                    </Link>
                  </Checkbox>
                </Stack>
                <div className={styles.buttonRow}>
                <Stack direction="row" gap={12}>
                  <Button type="button" variant="secondary" onClick={handleBack}>
                    Back
                  </Button>
                  <Button onClick={handleNext} disabled={!email.trim() || !agreedToTerms}>
                    Complete registration
                  </Button>
                </Stack>
                </div>
              </FormSection>
            )}
          </Stack>
        </Section>
      </div>
    </Container>
  );
}
