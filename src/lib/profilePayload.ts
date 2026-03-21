import type { TalentDetails } from "@/types";

export const PENDING_PROFILE_UPSERT_KEY = "pending.profile.upsert";

export type TalentDbUpsertPayload = {
  entity: "talent_profile";
  userId: string;
  updatedAt: string;
  data: {
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    bio: string;
    country?: string;
    city?: string;
    skills: string[];
    languages: string[];
    linkedinUrl?: string;
    portfolioUrl?: string;
    githubUrl?: string;
    resumeUrl?: string;
    experiences: Array<{
      id: string;
      companyName: string;
      jobTitle: string;
      industry?: string;
      employmentType: string;
      yearsInCompany?: number;
    }>;
  };
};

export function buildTalentDbUpsertPayload(user: TalentDetails): TalentDbUpsertPayload {
  return {
    entity: "talent_profile",
    userId: user.id,
    updatedAt: new Date().toISOString(),
    data: {
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      bio: user.bio,
      country: user.address?.country,
      city: user.address?.city,
      skills: user.skills ?? [],
      languages: user.languages ?? [],
      linkedinUrl: user.linkedinUrl,
      portfolioUrl: user.portfolioUrl,
      githubUrl: user.githubUrl,
      resumeUrl: user.resumeUrl,
      experiences: (user.experiences ?? []).map((exp) => ({
        id: exp.id,
        companyName: exp.companyName,
        jobTitle: exp.jobTitle,
        industry: exp.industry,
        employmentType: exp.employmentType,
        yearsInCompany: exp.yearsInCompany,
      })),
    },
  };
}
