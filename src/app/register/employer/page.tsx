"use client";

import { useState, useEffect, useRef } from "react";
import {
  Breadcrumbs,
  Container,
  Section,
  Stack,
  FormSection,
  FormRow,
  FormField,
  Input,
  TextArea,
  Select,
  Checkbox,
  Button,
  Stepper,
  FileUpload,
  FileListPreview,
  Modal,
} from "@/components/ui";
import { extractTextFromPdf, PdfRejectError } from "@/lib/extract-pdf-text";
import styles from "./page.module.css";

const STEPS = [
  { id: "whatLookingFor", label: "What you're looking for" },
  { id: "website", label: "Upload your website" },
  { id: "completeProfile", label: "Complete missing information" },
  { id: "image", label: "Image & background" },
  { id: "account", label: "Create account" },
];

const ISRAEL_CITIES = [
  "Tel Aviv",
  "Jerusalem",
  "Haifa",
  "Be'er Sheva",
  "Rishon LeZion",
  "Petah Tikva",
  "Netanya",
  "Holon",
  "Bnei Brak",
  "Ramat Gan",
  "Ashdod",
  "Ashkelon",
  "Rehovot",
  "Bat Yam",
  "Herzliya",
  "Kfar Saba",
  "Hadera",
  "Modi'in",
  "Raanana",
  "Ramla",
  "Lod",
  "Nahariya",
  "Givatayim",
  "Kiryat Ata",
  "Eilat",
  "Ramat HaSharon",
  "Kiryat Gat",
  "Dimona",
  "Tamra",
  "Sakhnin",
  "Yavne",
  "Tiberias",
  "Ma'alot-Tarshiha",
  "Afula",
  "Kiryat Motzkin",
  "Ofakim",
  "Netivot",
  "Remote (Israel)",
  "Any",
];

const INDUSTRIES = [
  "Technology / Software",
  "FinTech",
  "Healthcare",
  "Marketing / Advertising",
  "Design",
  "Education",
  "E-commerce",
  "Cybersecurity",
  "Gaming",
  "Real Estate",
  "Legal",
  "Manufacturing",
  "Retail",
  "Media / Entertainment",
  "Non-profit",
  "Other",
];

type BackgroundTheme = "blue" | "violet" | "teal" | "amber" | "rose" | "emerald";

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

const MAX_JOB_DESCRIPTION_FILES = 3;

export default function EmployerRegisterPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [jobDescriptionFiles, setJobDescriptionFiles] = useState<File[]>([]);
  const jobDescriptionFilesRef = useRef<File[]>([]);
  const [careerPageUrl, setCareerPageUrl] = useState("");
  const [aboutPageUrl, setAboutPageUrl] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [backgroundTheme, setBackgroundTheme] = useState<BackgroundTheme>("blue");
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);
  const [pdfError, setPdfError] = useState<string | null>(null);

  function handleJobDescriptionFilesSelected(files: FileList) {
    const newFiles = Array.from(files).filter((f) => f.type === "application/pdf");
    if (newFiles.length < Array.from(files).length) {
      setPdfError("Only PDF files are accepted. Please upload PDFs only.");
    }
    const next = [...jobDescriptionFilesRef.current, ...newFiles].slice(
      0,
      MAX_JOB_DESCRIPTION_FILES
    );
    jobDescriptionFilesRef.current = next;
    setJobDescriptionFiles(next);
    next.forEach((file) => {
      extractTextFromPdf(file).catch((err) => {
        const message =
          err instanceof PdfRejectError
            ? err.message
            : err instanceof Error
              ? err.message
              : "This PDF could not be read. Please use a different file.";
        setPdfError(message);
        setJobDescriptionFiles((prev) => {
          const updated = prev.filter((f) => f !== file);
          jobDescriptionFilesRef.current = updated;
          return updated;
        });
      });
    });
  }

  function handleRemoveJobDescriptionFile(_file: File, index: number) {
    const next = jobDescriptionFiles.filter((_, i) => i !== index);
    jobDescriptionFilesRef.current = next;
    setJobDescriptionFiles(next);
  }

  const gradientStyle = (theme: BackgroundTheme) => ({
    backgroundImage: `radial-gradient(circle at 10% 0%, ${THEME_GRADIENTS[theme].start} 0%, ${THEME_GRADIENTS[theme].mid} 42%, ${THEME_GRADIENTS[theme].end} 100%)`,
  });

  const hasWebsiteUrls = careerPageUrl.trim() !== "" || aboutPageUrl.trim() !== "";
  const canContinueStep2 = hasWebsiteUrls;

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

  const isLastStep = currentStep === STEPS.length - 1;

  function handleNext() {
    if (isLastStep) return;
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
              { label: "Register", href: "/register/employer" },
              { label: "Employer", active: true },
            ]}
          />
        </div>
        <Section
          title="Join MatchTech as an Employer"
          description="Complete the steps below to create your hiring account."
        >
          <Stack gap={32}>
            <Stepper steps={STEPS} currentIndex={currentStep} />

            {currentStep === 0 && (
              <FormSection title="What you're looking for">
                <p
                  style={{
                    fontSize: "var(--font-size-body-sm)",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  Upload up to 3 job descriptions as PDFs only, in English. We will extract everything we can from each file and create a card for each position. Max 3MB, 5 pages per PDF. Whatever we can’t extract will be filled in manually in a later step.
                </p>
                <FileUpload
                  label="Job descriptions"
                  description="Upload up to 3 job descriptions. PDF only, in English. Max 3MB, 5 pages each."
                  accept=".pdf,application/pdf"
                  multiple
                  onFilesSelected={handleJobDescriptionFilesSelected}
                />
                <Modal
                  open={!!pdfError}
                  title="Problem with PDF"
                  description={pdfError ?? undefined}
                  primaryActionLabel="OK"
                  onPrimaryAction={() => setPdfError(null)}
                  onClose={() => setPdfError(null)}
                />
                {jobDescriptionFiles.length > 0 && (
                  <>
                    <FileListPreview
                      files={jobDescriptionFiles}
                      variant="document"
                      onRemove={handleRemoveJobDescriptionFile}
                    />
                    {jobDescriptionFiles.length >= MAX_JOB_DESCRIPTION_FILES && (
                      <p style={{ fontSize: 12, color: "var(--color-text-muted)", marginTop: 4 }}>
                        Max 3 files. Only the first 3 are used.
                      </p>
                    )}
                  </>
                )}
                <p style={{ marginTop: 16, marginBottom: 0 }}>
                  <button
                    type="button"
                    onClick={handleNext}
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
                    I don’t have job descriptions — I’ll fill in the details manually in the next steps
                  </button>
                </p>
                <Stack direction="row" gap={12} style={{ marginTop: 24 }}>
                  <Button onClick={handleNext}>Continue</Button>
                </Stack>
              </FormSection>
            )}

            {currentStep === 1 && (
              <FormSection title="Upload your website">
                <p
                  style={{
                    fontSize: "var(--font-size-body-sm)",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  Share your career page and about page so we can learn about your company and open roles.
                </p>
                <FormField id="career-page-url" label="Career page URL">
                  {(field) => (
                    <Input
                      {...field}
                      type="url"
                      placeholder="https://company.com/careers"
                      value={careerPageUrl}
                      onChange={(e) => setCareerPageUrl(e.target.value)}
                    />
                  )}
                </FormField>
                <FormField id="about-page-url" label="About page URL">
                  {(field) => (
                    <Input
                      {...field}
                      type="url"
                      placeholder="https://company.com/about"
                      value={aboutPageUrl}
                      onChange={(e) => setAboutPageUrl(e.target.value)}
                    />
                  )}
                </FormField>
                <Stack direction="row" gap={12} style={{ marginTop: 24 }}>
                  <Button type="button" variant="secondary" onClick={handleBack}>
                    Back
                  </Button>
                  <Button onClick={handleNext} disabled={!canContinueStep2}>
                    Continue
                  </Button>
                </Stack>
                <p style={{ marginTop: 16, marginBottom: 0 }}>
                  <button
                    type="button"
                    onClick={handleNext}
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
                    I don’t have a website
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
                  {hasWebsiteUrls
                    ? "Review and fix the information below. We extracted what we could — correct or add anything missing."
                    : "Fill in your company profile so we can create your card. You can change this later."}
                </p>
                <FormField id="company-name" label="Company name" required>
                  {(field) => (
                    <Input {...field} placeholder="e.g. Acme Ltd" />
                  )}
                </FormField>
                <FormField id="company-industry" label="Industry">
                  {(field) => (
                    <Select {...field} defaultValue="">
                      <option value="">Select industry</option>
                      {INDUSTRIES.map((industry) => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </Select>
                  )}
                </FormField>
                <FormField id="company-location" label="Location / region">
                  {(field) => (
                    <Select {...field} defaultValue="">
                      <option value="">Select city</option>
                      {ISRAEL_CITIES.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </Select>
                  )}
                </FormField>
                <FormField id="company-description" label="Short company description (optional)">
                  {(field) => (
                    <TextArea {...field} placeholder="What does your company do?" rows={3} />
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
              <FormSection title="Choose image & background">
                <div className={styles.step4Layout}>
                  <div className={styles.step4Form}>
                    <FileUpload
                      label="Company logo or image"
                      description="Your logo or a representative image. JPG or PNG. Max 5MB."
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
                  <div className={styles.step4Preview}>
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
                              alt="Company preview"
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
                      This is how your company card will look.
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
                    <Input {...field} placeholder="Choose a username" autoComplete="username" />
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
