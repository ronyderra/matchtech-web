import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { TalentDetails, CompanyDetails } from "@/types";

export type AppUser = TalentDetails | CompanyDetails;

type UserState = {
  user: AppUser | null;
  initDraft: (type: AppUser["type"]) => void;
  patchUser: (patch: Partial<AppUser>) => void;
  setUser: (user: AppUser | null) => void;
  clearUser: () => void;
};

const storageKey = "matchtech-user";

function getStorage() {
  if (typeof window === "undefined") {
    return {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    };
  }
  return localStorage;
}

function mergeUser(prev: AppUser, patch: Partial<AppUser>): AppUser {
  const next = { ...prev, ...patch } as AppUser;

  // Shallow-merge nested objects so sibling fields aren't lost.
  if (prev.type === "talent") {
    const prevT = prev as TalentDetails;
    const patchT = patch as Partial<TalentDetails>;
    const nextT = next as TalentDetails;
    if (patchT.address) nextT.address = { ...(prevT.address ?? {}), ...patchT.address };
    if (patchT.jobPosition) {
      nextT.jobPosition = {
        ...prevT.jobPosition,
        ...patchT.jobPosition,
      } as TalentDetails["jobPosition"];
    }
    if (patchT.swipeOnboarding) {
      nextT.swipeOnboarding = {
        ...(prevT.swipeOnboarding ?? { cvUploaded: false, surveyCompleted: false }),
        ...patchT.swipeOnboarding,
      };
    }
  } else {
    const prevC = prev as CompanyDetails;
    const patchC = patch as Partial<CompanyDetails>;
    const nextC = next as CompanyDetails;
    if (patchC.address) nextC.address = { ...(prevC.address ?? {}), ...patchC.address };
  }

  // Replace arrays when provided in patch (edits should be exact).
  if ("skills" in patch && patch.skills !== undefined) (next as TalentDetails).skills = patch.skills as TalentDetails["skills"];
  if ("languages" in patch && patch.languages !== undefined) (next as TalentDetails).languages = patch.languages as TalentDetails["languages"];
  if ("experiences" in patch && patch.experiences !== undefined) (next as TalentDetails).experiences = patch.experiences as TalentDetails["experiences"];
  if ("positions" in patch && patch.positions !== undefined) (next as CompanyDetails).positions = patch.positions as CompanyDetails["positions"];
  if ("tags" in patch && patch.tags !== undefined) (next as any).tags = patch.tags as any;
  if ("priorities" in patch && (patch as any).priorities !== undefined) (next as any).priorities = (patch as any).priorities;
  if ("compensationPreferences" in patch && (patch as any).compensationPreferences !== undefined) {
    (next as any).compensationPreferences = (patch as any).compensationPreferences;
  }

  return next;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      initDraft: (type) => {
        const existing = get().user;
        if (existing?.type === type) return;

        const id =
          typeof crypto !== "undefined" && "randomUUID" in crypto
            ? crypto.randomUUID()
            : String(Date.now());

        if (type === "talent") {
          const draft: TalentDetails = {
            id,
            type: "talent",
            firstName: "",
            lastName: "",
            fullName: "",
            avatarUrl: "",
            imageUrl: "",
            backgroundColor: "",
            role: "",
            yearsOfExperience: 0,
            employmentPreference: "any",
            workPreference: "any",
            bio: "",
            skills: [],
            email: "",
            phoneNumber: "",
            availableForWork: true,
            jobPosition: {
              id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : id,
              industry: "",
              seniority: "any",
              employmentType: "any",
              workPreference: "any",
            },
          };
          set({ user: draft });
          return;
        }

        const draft: CompanyDetails = {
          id,
          type: "company",
          companyName: "",
          logoUrl: "",
          imageUrl: "",
          backgroundColor: "",
          positions: [],
        };
        set({ user: draft });
      },
      patchUser: (patch) => {
        const prev = get().user;
        if (!prev) return;
        if (patch.type && patch.type !== prev.type) return;
        set({ user: mergeUser(prev, patch) });
      },
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: storageKey,
      storage: createJSONStorage(getStorage),
    }
  )
);

export function isTalent(user: AppUser): user is TalentDetails {
  return user.type === "talent";
}

export function isCompany(user: AppUser): user is CompanyDetails {
  return user.type === "company";
}
