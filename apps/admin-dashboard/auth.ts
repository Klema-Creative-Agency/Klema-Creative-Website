import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { queryOne } from "@klema/db";

declare module "next-auth" {
  interface User {
    role: string;
    clientId?: string;
    tierId?: number;
  }
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
      clientId?: string;
      tierId?: number;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string;
    userId: string;
    clientId?: string;
    tierId?: number;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await queryOne<{
          id: string;
          email: string;
          name: string;
          password_hash: string;
          role: string;
          is_active: boolean;
        }>("SELECT * FROM users WHERE email = $1", [credentials.email as string]);

        if (!user || !user.is_active) return null;

        // Admin dashboard: reject client role
        if (user.role === "client") return null;

        const valid = await compare(credentials.password as string, user.password_hash);
        if (!valid) return null;

        // Update last login
        await queryOne("UPDATE users SET last_login_at = NOW() WHERE id = $1 RETURNING id", [user.id]);

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  pages: { signIn: "/login" },
  cookies: {
    sessionToken: {
      name: "admin.session-token",
      options: { httpOnly: true, sameSite: "lax", path: "/" },
    },
    callbackUrl: {
      name: "admin.callback-url",
      options: { httpOnly: true, sameSite: "lax", path: "/" },
    },
    csrfToken: {
      name: "admin.csrf-token",
      options: { httpOnly: true, sameSite: "lax", path: "/" },
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.userId = user.id!;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.userId;
      session.user.role = token.role;
      return session;
    },
  },
});
