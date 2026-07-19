import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { Provider } from "next-auth/providers";
import { isDatabaseEnabled, prisma } from "@/shared/db/prisma";

/**
 * Identity skeleton (Auth.js).
 * Set AUTH_SECRET always.
 * Optional: AUTH_GITHUB_ID + AUTH_GITHUB_SECRET for GitHub sign-in.
 * Database sessions activate only when USE_DATABASE is enabled.
 */
const providers: Provider[] = [];

if (process.env.AUTH_GITHUB_ID && process.env.AUTH_GITHUB_SECRET) {
  providers.push(
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  );
}

const useDatabaseSessions = isDatabaseEnabled() && providers.length > 0;

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: useDatabaseSessions ? PrismaAdapter(prisma) : undefined,
  providers,
  session: { strategy: useDatabaseSessions ? "database" : "jwt" },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user?.id) token.sub = user.id;
      return token;
    },
    session({ session, token, user }) {
      if (session.user) {
        session.user.id = user?.id ?? token.sub ?? "";
      }
      return session;
    },
  },
  trustHost: true,
});
