import type { NextAuthOptions } from "next-auth";
import LinkedInProvider from "next-auth/providers/linkedin";
import { ensureUserFromLinkedIn, findUserByAuth } from "@/lib/user-repository";

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
    async signIn({ account, profile, user }) {
      if (account?.provider !== "linkedin" || !account.providerAccountId) return true;
      await ensureUserFromLinkedIn(
        {
          provider: "linkedin",
          providerAccountId: account.providerAccountId,
          email: user.email,
        },
        {
          name: user.name,
          email: user.email,
          image: user.image,
          givenName: (profile as { given_name?: string } | undefined)?.given_name,
          familyName: (profile as { family_name?: string } | undefined)?.family_name,
        }
      );
      return true;
    },
    async jwt({ token, user }) {
      if ((token as { userId?: string }).userId) return token;

      const providerAccountId =
        (token as { providerAccountId?: string }).providerAccountId ??
        (token.sub ? String(token.sub) : undefined);

      if (providerAccountId) {
        const dbUser = await findUserByAuth({
          provider: "linkedin",
          providerAccountId,
        });
        if (dbUser) {
          (token as { userId?: string }).userId = dbUser._id.toHexString();
          (token as { providerAccountId?: string }).providerAccountId = providerAccountId;
          return token;
        }
      }

      if (user?.id) {
        (token as { userId?: string }).userId = user.id;
      } else if (!(token as { userId?: string }).userId && token.sub) {
        (token as { userId?: string }).userId = token.sub;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id =
          ((token as { userId?: string }).userId as string | undefined) ?? token.sub ?? undefined;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      const dashboardUrl = new URL("/dashboard", baseUrl).toString();
      if (url.startsWith("/")) return new URL(url, baseUrl).toString();
      if (url.startsWith(baseUrl)) return url;
      return dashboardUrl;
    },
  },
};
