import type { NextAuthOptions } from "next-auth";
import LinkedInProvider from "next-auth/providers/linkedin";

export const authOptions: NextAuthOptions = {
  providers: [
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID ?? "",
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          scope: "openid profile email",
        },
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
