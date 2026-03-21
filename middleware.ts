import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/",
  },
  callbacks: {
    authorized: ({ req, token }) => {
      const isLocalhost = req.nextUrl.hostname === "localhost" || req.nextUrl.hostname === "127.0.0.1";
      if (process.env.NODE_ENV === "development" && isLocalhost) {
        return true;
      }
      return !!token;
    },
  },
});

export const config = {
  matcher: ["/dashboard/:path*", "/users"],
};
