import { ObjectId, type Collection } from "mongodb";
import type { CompensationPreference, EmploymentType, PriorityPreference, TalentDetails } from "@/types";
import { getMongoDb } from "@/lib/mongodb";

type AuthIdentity = {
  provider: "linkedin";
  providerAccountId: string;
  email?: string | null;
};

type LinkedInProfileSeed = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  givenName?: string | null;
  familyName?: string | null;
};

export type UserDocument = {
  _id: ObjectId;
  auth: {
    provider: "linkedin";
    providerAccountId: string;
    email?: string;
  };
  profile: TalentDetails;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
};

let indexesPromise: Promise<void> | null = null;

async function getUsersCollection(): Promise<Collection<UserDocument>> {
  const db = await getMongoDb();
  const collection = db.collection<UserDocument>("users");
  if (!indexesPromise) {
    indexesPromise = Promise.all([
      collection.createIndex({ "auth.provider": 1, "auth.providerAccountId": 1 }, { unique: true }),
      collection.createIndex({ "auth.email": 1 }, { unique: true, sparse: true }),
    ]).then(() => undefined);
  }
  await indexesPromise;
  return collection;
}

function splitName(name?: string | null, givenName?: string | null, familyName?: string | null) {
  const safeGiven = givenName?.trim() || "";
  const safeFamily = familyName?.trim() || "";
  if (safeGiven || safeFamily) return { firstName: safeGiven, lastName: safeFamily };
  const full = (name || "").trim();
  if (!full) return { firstName: "", lastName: "" };
  const [first, ...rest] = full.split(/\s+/);
  return { firstName: first || "", lastName: rest.join(" ") };
}

function createInitialTalentProfile(id: ObjectId, seed: LinkedInProfileSeed): TalentDetails {
  const { firstName, lastName } = splitName(seed.name, seed.givenName, seed.familyName);
  const fullName = `${firstName} ${lastName}`.trim();
  return {
    id: id.toHexString(),
    type: "talent",
    firstName,
    lastName,
    fullName,
    avatarUrl: seed.image || "",
    imageUrl: seed.image || "",
    backgroundColor: "",
    role: "",
    yearsOfExperience: 0,
    employmentPreference: "any",
    workPreference: "any",
    bio: "",
    skills: [],
    email: seed.email || "",
    phoneNumber: "",
    availableForWork: true,
    jobPosition: {
      id: new ObjectId().toHexString(),
      industry: "",
      seniority: "any",
      employmentType: "any",
      workPreference: "any",
    },
  };
}

export function mergeTalentProfile(existing: TalentDetails, patch: Partial<TalentDetails>): TalentDetails {
  const next = { ...existing, ...patch };
  if (patch.address) {
    next.address = { ...(existing.address ?? {}), ...patch.address };
  }
  if (patch.jobPosition) {
    next.jobPosition = { ...existing.jobPosition, ...patch.jobPosition };
  }
  if (patch.skills !== undefined) next.skills = patch.skills;
  if (patch.languages !== undefined) next.languages = patch.languages;
  if (patch.experiences !== undefined) next.experiences = patch.experiences;
  if (patch.priorities !== undefined) next.priorities = patch.priorities;
  if (patch.compensationPreferences !== undefined) next.compensationPreferences = patch.compensationPreferences;
  return next as TalentDetails;
}

export async function findUserByAuth(identity: AuthIdentity): Promise<UserDocument | null> {
  const users = await getUsersCollection();
  return users.findOne({
    "auth.provider": identity.provider,
    "auth.providerAccountId": identity.providerAccountId,
  });
}

export async function findUserById(userId: string): Promise<UserDocument | null> {
  if (!ObjectId.isValid(userId)) return null;
  const users = await getUsersCollection();
  return users.findOne({ _id: new ObjectId(userId) });
}

export async function ensureUserFromLinkedIn(
  identity: AuthIdentity,
  seed: LinkedInProfileSeed
): Promise<UserDocument> {
  const users = await getUsersCollection();
  const existing = await findUserByAuth(identity);
  const now = new Date();

  if (existing) {
    const profilePatch: Partial<TalentDetails> = {};
    if (!existing.profile.email && seed.email) profilePatch.email = seed.email;
    if (!existing.profile.imageUrl && seed.image) profilePatch.imageUrl = seed.image;
    if (!existing.profile.avatarUrl && seed.image) profilePatch.avatarUrl = seed.image;
    if (!existing.profile.firstName || !existing.profile.lastName) {
      const parts = splitName(seed.name, seed.givenName, seed.familyName);
      if (!existing.profile.firstName && parts.firstName) profilePatch.firstName = parts.firstName;
      if (!existing.profile.lastName && parts.lastName) profilePatch.lastName = parts.lastName;
      const composed = `${profilePatch.firstName ?? existing.profile.firstName} ${profilePatch.lastName ?? existing.profile.lastName}`.trim();
      if (composed) profilePatch.fullName = composed;
    }
    const nextProfile =
      Object.keys(profilePatch).length > 0 ? mergeTalentProfile(existing.profile, profilePatch) : existing.profile;
    await users.updateOne(
      { _id: existing._id },
      {
        $set: {
          "auth.email": identity.email || undefined,
          profile: nextProfile,
          updatedAt: now,
          lastLoginAt: now,
        },
      }
    );
    return { ...existing, profile: nextProfile, updatedAt: now, lastLoginAt: now };
  }

  const _id = new ObjectId();
  const profile = createInitialTalentProfile(_id, seed);
  const newDoc: UserDocument = {
    _id,
    auth: {
      provider: "linkedin",
      providerAccountId: identity.providerAccountId,
      email: identity.email || undefined,
    },
    profile,
    createdAt: now,
    updatedAt: now,
    lastLoginAt: now,
  };
  await users.insertOne(newDoc);
  return newDoc;
}

function normalizeEmploymentType(value: unknown): EmploymentType | undefined {
  if (typeof value !== "string") return undefined;
  const allowed: EmploymentType[] = ["any", "student", "full-time", "part-time", "contract", "freelance"];
  return allowed.includes(value as EmploymentType) ? (value as EmploymentType) : undefined;
}

export function normalizeTalentPatch(input: unknown): Partial<TalentDetails> {
  const raw = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const patch: Partial<TalentDetails> = {};
  if (raw.firstName !== undefined) patch.firstName = typeof raw.firstName === "string" ? raw.firstName.trim() : "";
  if (raw.lastName !== undefined) patch.lastName = typeof raw.lastName === "string" ? raw.lastName.trim() : "";
  if (raw.fullName !== undefined) patch.fullName = typeof raw.fullName === "string" ? raw.fullName.trim() : "";
  if (raw.email !== undefined) patch.email = typeof raw.email === "string" ? raw.email.trim() : "";
  if (raw.phoneNumber !== undefined) patch.phoneNumber = typeof raw.phoneNumber === "string" ? raw.phoneNumber.trim() : "";
  if (raw.bio !== undefined) patch.bio = typeof raw.bio === "string" ? raw.bio.trim() : "";
  if (raw.linkedinUrl !== undefined) patch.linkedinUrl = typeof raw.linkedinUrl === "string" ? raw.linkedinUrl.trim() : undefined;
  if (raw.portfolioUrl !== undefined) patch.portfolioUrl = typeof raw.portfolioUrl === "string" ? raw.portfolioUrl.trim() : undefined;
  if (raw.githubUrl !== undefined) patch.githubUrl = typeof raw.githubUrl === "string" ? raw.githubUrl.trim() : undefined;
  if (raw.resumeUrl !== undefined) patch.resumeUrl = typeof raw.resumeUrl === "string" ? raw.resumeUrl.trim() : undefined;
  if (raw.availableFrom !== undefined) patch.availableFrom = typeof raw.availableFrom === "string" ? raw.availableFrom.trim() : undefined;
  if (Array.isArray(raw.skills)) patch.skills = raw.skills.filter((v): v is string => typeof v === "string").map((s) => s.trim()).filter(Boolean);
  if (Array.isArray(raw.languages)) patch.languages = raw.languages.filter((v): v is string => typeof v === "string").map((s) => s.trim()).filter(Boolean);
  if (raw.address && typeof raw.address === "object") {
    const address = raw.address as Record<string, unknown>;
    patch.address = {
      city: typeof address.city === "string" ? address.city.trim() : undefined,
      country: typeof address.country === "string" ? address.country.trim() : undefined,
    };
  }
  if (raw.jobPosition && typeof raw.jobPosition === "object") {
    const job = raw.jobPosition as Record<string, unknown>;
    patch.jobPosition = {
      id: typeof job.id === "string" && job.id.trim() ? job.id : new ObjectId().toHexString(),
      industry: typeof job.industry === "string" ? job.industry.trim() : "",
      departments: Array.isArray(job.departments)
        ? job.departments.filter((v): v is string => typeof v === "string").map((s) => s.trim()).filter(Boolean)
        : undefined,
      seniority:
        typeof job.seniority === "string"
          ? (job.seniority as TalentDetails["jobPosition"]["seniority"])
          : "any",
      employmentType: normalizeEmploymentType(job.employmentType) || "any",
      workPreference:
        typeof job.workPreference === "string"
          ? (job.workPreference as TalentDetails["jobPosition"]["workPreference"])
          : "any",
      country: typeof job.country === "string" ? job.country.trim() : undefined,
      city: typeof job.city === "string" ? job.city.trim() : undefined,
      salaryMin: typeof job.salaryMin === "number" ? job.salaryMin : undefined,
      salaryMax: typeof job.salaryMax === "number" ? job.salaryMax : undefined,
      currency: typeof job.currency === "string" ? job.currency.trim() : undefined,
      equity: typeof job.equity === "boolean" ? job.equity : undefined,
    };
  }
  if (Array.isArray(raw.priorities)) {
    patch.priorities = raw.priorities.filter((v): v is PriorityPreference => typeof v === "string");
  }
  if (Array.isArray(raw.compensationPreferences)) {
    patch.compensationPreferences = raw.compensationPreferences.filter(
      (v): v is CompensationPreference => typeof v === "string"
    );
  }
  if (Array.isArray(raw.experiences)) {
    patch.experiences = raw.experiences
      .filter((v): v is Record<string, unknown> => !!v && typeof v === "object")
      .map((exp) => ({
        id: typeof exp.id === "string" && exp.id.trim() ? exp.id : new ObjectId().toHexString(),
        companyName: typeof exp.companyName === "string" ? exp.companyName.trim() : "",
        jobTitle: typeof exp.jobTitle === "string" ? exp.jobTitle.trim() : "",
        industry: typeof exp.industry === "string" ? exp.industry.trim() : undefined,
        employmentType: normalizeEmploymentType(exp.employmentType) || "any",
        yearsInCompany: typeof exp.yearsInCompany === "number" ? exp.yearsInCompany : undefined,
      }))
      .filter((exp) => exp.companyName || exp.jobTitle);
  }
  return patch;
}

export async function updateTalentProfileByUserId(
  userId: string,
  patch: Partial<TalentDetails>
): Promise<TalentDetails | null> {
  const user = await findUserById(userId);
  if (!user) return null;
  const nextProfile = mergeTalentProfile(user.profile, patch);
  const users = await getUsersCollection();
  await users.updateOne(
    { _id: user._id },
    {
      $set: {
        profile: nextProfile,
        updatedAt: new Date(),
      },
    }
  );
  return nextProfile;
}
