"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Checkbox,
  Divider,
  FileListPreview,
  FileUpload,
  FormField,
  FormRow,
  FormSection,
  Input,
  Modal,
  MultiSelectDropdown,
  ProgressBar,
  Select,
  Stack,
  TagInput,
  TextArea,
  Toast,
} from "@/components/ui";
import { extractTextFromPdf, PdfRejectError } from "@/lib/extract-pdf-text";
import { useUserStore } from "@/store";
import type { TalentDetails } from "@/types";
import { COUNTRIES } from "@/constants/options";
import { notifySwipeOnboardingUpdated } from "@/lib/swipeOnboardingGate";
import {
  buildTalentDbUpsertPayload,
  PENDING_PROFILE_UPSERT_KEY,
  syncTalentProfileToApi,
} from "@/lib/profilePayload";

export default function UploadCvPage() {
  const router = useRouter();
  const user = useUserStore((s) => s.user);
  const initDraft = useUserStore((s) => s.initDraft);
  const patchUser = useUserStore((s) => s.patchUser);
  const [cvFiles, setCvFiles] = useState<File[]>([]);
  const [cvEntryMode, setCvEntryMode] = useState<"cv" | "manual">("cv");
  const [cvUploadVisible, setCvUploadVisible] = useState(true);
  const [agreedToCvExtraction, setAgreedToCvExtraction] = useState(false);
  const [cvProcessing, setCvProcessing] = useState(false);
  const [cvProgress, setCvProgress] = useState(0);
  const [cvParsed, setCvParsed] = useState(false);
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
  type ExperienceDraft = {
    companyName: string;
    industry: string;
    yearsInCompany: string;
    roleInCompany: string;
  };
  const [experienceDrafts, setExperienceDrafts] = useState<ExperienceDraft[]>([
    { companyName: "", industry: "", yearsInCompany: "", roleInCompany: "" },
  ]);
  const [pdfError, setPdfError] = useState<string | null>(null);
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

  useEffect(() => {
    initDraft("talent");
  }, [initDraft]);

  useEffect(() => {
    if (!user || user.type !== "talent") return;
    const t = user as TalentDetails;
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

  useEffect(() => {
    if (!cvProcessing) return;
    const id = window.setInterval(() => {
      setCvProgress((p) => {
        if (p >= 92) return p;
        const step = p < 30 ? 3 : p < 60 ? 2 : 1;
        return Math.min(92, p + step);
      });
    }, 180);
    return () => window.clearInterval(id);
  }, [cvProcessing]);

  async function markComplete() {
    const nextTalent = {
      ...(user as TalentDetails),
      type: "talent",
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
                employmentType: user?.type === "talent" ? user.jobPosition.employmentType : "any",
                yearsInCompany: exp.yearsInCompany,
              }))
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
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not save profile to database.";
      showToast("error", "Save failed", message);
      return;
    }
    window.localStorage.setItem("onboarding.cvUploaded", "true");
    notifySwipeOnboardingUpdated();
    router.push("/dashboard/swipe");
  }

  return (
    <main style={{ maxWidth: 980, margin: "0 auto" }}>
      <section
        style={{
          padding: "20px 24px",
          borderRadius: 4,
          border: "1px solid var(--color-border)",
          background: "var(--color-surface)",
        }}
      >
        <Toast
          open={toastOpen}
          status={toastStatus}
          title={toastTitle}
          description={toastDescription || undefined}
        />

        <p style={{ margin: 0, fontSize: 13, color: "var(--color-text-muted)" }}>Step 3: CV & profile</p>
        <h1 style={{ margin: "6px 0 8px", fontSize: 30, lineHeight: "36px" }}>Upload your CV</h1>
        <p style={{ margin: 0, color: "var(--color-text-secondary)" }}>
          Upload a PDF resume and we&apos;ll extract what we can to prefill your profile.
        </p>

        <FormSection title="Upload your CV">
          {cvEntryMode === "cv" && cvUploadVisible ? (
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

                    try {
                      const responseJson: unknown = JSON.parse(result.text);
                      const parsed =
                        responseJson && typeof responseJson === "object" && "firstName" in responseJson
                          ? responseJson
                          : (() => {
                              const responseObj =
                                responseJson && typeof responseJson === "object"
                                  ? (responseJson as Record<string, unknown>)
                                  : {};
                              const outputTextDirect = responseObj.output_text;
                              let maybeOutputText: string | undefined;
                              if (typeof outputTextDirect === "string") {
                                maybeOutputText = outputTextDirect;
                              } else {
                                const output = responseObj.output;
                                if (Array.isArray(output) && output[0] && typeof output[0] === "object") {
                                  const firstOutput = output[0] as Record<string, unknown>;
                                  const content = firstOutput.content;
                                  if (Array.isArray(content)) {
                                    const outputTextItem = content.find(
                                      (c) =>
                                        !!c &&
                                        typeof c === "object" &&
                                        (c as Record<string, unknown>).type === "output_text" &&
                                        typeof (c as Record<string, unknown>).text === "string"
                                    ) as Record<string, unknown> | undefined;
                                    maybeOutputText =
                                      outputTextItem && typeof outputTextItem.text === "string"
                                        ? outputTextItem.text
                                        : undefined;
                                  }
                                }
                              }
                              return JSON.parse(String(maybeOutputText ?? "{}"));
                            })();

                      if (user?.type === "talent") {
                        const t = user as TalentDetails;
                        const nextFirst = parsed?.firstName ? String(parsed.firstName) : t.firstName;
                        const nextLast = parsed?.lastName ? String(parsed.lastName) : t.lastName;
                        const nextEmail = parsed?.email ? String(parsed.email) : t.email;
                        const nextPhone = parsed?.phone ? String(parsed.phone) : t.phoneNumber;
                        const nextCity = parsed?.city ? String(parsed.city) : t.address?.city ?? "";
                        const nextCountry = parsed?.country ? String(parsed.country) : t.address?.country ?? "";
                        const nextBio = parsed?.bio ? String(parsed.bio) : t.bio;
                        const nextLinkedin = parsed?.linkedin ? String(parsed.linkedin) : t.linkedinUrl ?? "";
                        const nextPortfolio = parsed?.portfolio ? String(parsed.portfolio) : t.portfolioUrl ?? "";
                        const nextGithub = parsed?.github ? String(parsed.github) : t.githubUrl ?? "";
                        const nextResumeUrl =
                          typeof parsed?.resumeUrl === "string" ? parsed.resumeUrl : t.resumeUrl ?? "";
                        const nextSkills = Array.isArray(parsed?.skills) ? parsed.skills.map(String) : t.skills;
                        const nextLanguages = Array.isArray(parsed?.languages)
                          ? parsed.languages.map(String)
                          : (t.languages ?? []);

                        setFirstName(nextFirst);
                        setLastName(nextLast);
                        setEmail(nextEmail);
                        setPhoneNumber(nextPhone);
                        setAddressCity(nextCity);
                        setAddressCountry(nextCountry);
                        setBio(nextBio);
                        setLinkedinUrl(nextLinkedin);
                        setPortfolioUrl(nextPortfolio);
                        setGithubUrl(nextGithub);
                        setResumeUrl(nextResumeUrl);
                        setSkillsProfile(nextSkills);
                        setLanguages(nextLanguages);

                        if (Array.isArray(parsed?.experience)) {
                          const drafts = parsed.experience
                            .map((entry: unknown) => {
                              const e = entry && typeof entry === "object" ? (entry as Record<string, unknown>) : {};
                              return {
                                companyName: e.companyName ? String(e.companyName) : "",
                                industry: e.industry ? String(e.industry) : "",
                              yearsInCompany:
                                typeof e.years === "number" && Number.isFinite(e.years)
                                  ? String(e.years)
                                  : "",
                                roleInCompany: e.role ? String(e.role) : "",
                              };
                            })
                            .filter(
                              (e: ExperienceDraft) =>
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
                          firstName: nextFirst,
                          lastName: nextLast,
                          fullName: `${nextFirst} ${nextLast}`.trim(),
                          email: nextEmail,
                          phoneNumber: nextPhone,
                          bio: nextBio,
                          linkedinUrl: nextLinkedin || undefined,
                          portfolioUrl: nextPortfolio || undefined,
                          githubUrl: nextGithub || undefined,
                          resumeUrl: nextResumeUrl || undefined,
                          skills: nextSkills,
                          languages: nextLanguages,
                          address:
                            nextCity || nextCountry
                              ? {
                                  city: nextCity || undefined,
                                  country: nextCountry || undefined,
                                }
                              : t.address,
                        } as Partial<TalentDetails>);
                      }
                    } catch {
                      // keep flow same as register step: parsing errors fallback to manual correction later
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
                        ? "We couldn’t get a response in time. Please try again."
                        : err instanceof PdfRejectError
                          ? err.message
                          : err instanceof Error
                            ? err.message
                            : "There was a problem processing your CV. Please try again.";
                    showToast("error", "CV processing failed", message);
                    setCvFiles((prev) => prev.filter((f) => f !== file));
                  })
                  .finally(() => {
                    setCvProcessing(false);
                    window.setTimeout(() => setCvProgress(0), 400);
                  });
              }}
            />
          ) : null}

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

          {cvEntryMode === "cv" && cvFiles.length > 0 ? (
            <FileListPreview
              files={cvFiles}
              variant="document"
              onRemove={(_, index) => {
                setCvFiles((prev) => prev.filter((__, i) => i !== index));
                setCvParsed(false);
              }}
            />
          ) : null}

          {cvEntryMode === "cv" && cvFiles.length > 0 && !cvParsed ? (
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

          <p style={{ marginTop: 14, marginBottom: 0 }}>
            {cvEntryMode === "cv" ? (
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
            ) : (
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
            )}
          </p>

          {cvEntryMode === "cv" && cvParsed && !cvUploadVisible ? (
            <div style={{ marginTop: 10 }}>
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
        </FormSection>

        {cvEntryMode === "manual" || (cvEntryMode === "cv" && cvParsed) ? (
          <>
            <Divider />
            <FormSection
              title="Complete missing information"
              description="Fill manually or review extracted fields before continuing."
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

              <FormRow>
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
              </FormRow>

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

              <Divider />

              <FormSection title="Experience" description="Your past roles (optional for now).">
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
                    onClick={markComplete}
                    disabled={
                      (cvEntryMode === "cv" ? !cvParsed : false) ||
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
            </FormSection>
          </>
        ) : null}
      </section>
    </main>
  );
}
