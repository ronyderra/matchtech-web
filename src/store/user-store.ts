import { create } from "zustand";
import type { TalentDetails, CompanyDetails } from "@/types";

export type AppUser = TalentDetails | CompanyDetails;

type UserState = {
  user: AppUser | null;
  setUser: (user: AppUser | null) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

export function isTalent(user: AppUser): user is TalentDetails {
  return user.type === "talent";
}

export function isCompany(user: AppUser): user is CompanyDetails {
  return user.type === "company";
}
