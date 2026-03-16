import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { TalentDetails, CompanyDetails } from "@/types";

export type AppUser = TalentDetails | CompanyDetails;

type UserState = {
  user: AppUser | null;
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

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
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
