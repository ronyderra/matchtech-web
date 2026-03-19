import type { NextAuthOptions } from "next-auth";
import LinkedInProvider from "next-auth/providers/linkedin";

export const authOptions: NextAuthOptions = {
  providers: [
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID ?? "",
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET ?? "",
      issuer: "https://www.linkedin.com/oauth",
      wellKnown: "https://www.linkedin.com/oauth/.well-known/openid-configuration",
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },
      profile(profile) {
        return {
          id: String((profile as { sub?: string; id?: string }).sub ?? (profile as { id?: string }).id ?? ""),
          name:
            (profile as { name?: string }).name ??
            `${(profile as { given_name?: string }).given_name ?? ""} ${(profile as { family_name?: string }).family_name ?? ""}`.trim(),
          email: (profile as { email?: string }).email ?? null,
          image: (profile as { picture?: string }).picture ?? null,
        };
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      const dashboardUrl = new URL("/dashboard", baseUrl).toString();
      if (url.startsWith("/")) return new URL(url, baseUrl).toString();
      if (url.startsWith(baseUrl)) return url;
      return dashboardUrl;
    },
  },
};
