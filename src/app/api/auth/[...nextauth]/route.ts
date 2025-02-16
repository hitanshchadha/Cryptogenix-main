import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt" as const, // Use JWT sessions
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id; // ✅ Use token.id to ensure session has user ID
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // ✅ Store user ID inside token
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/Dashboard`; // Redirect to /dashboard after login
    },
    async signIn({ user, account }) {
      try {
        // ✅ Check if user already exists
        let existingUser = await prisma.user.findUnique({
          where: { email: user.email },
          include: { accounts: true },
        });

        if (!existingUser) {
          // ✅ Create user with Wallet relation
          existingUser = await prisma.user.create({
            data: {
              id: user.id,
              name: user.name,
              email: user.email,
              image: user.image,
              emailVerified: new Date(),
              wallets: {
                create: {
                  address: "", // Default empty address, user can add later
                  balance: 0,
                },
              },
              accounts: {
                create: [
                  {
                    provider: account.provider,
                    providerAccountId: account.providerAccountId,
                    type: account.type,
                    access_token: account.access_token,
                    refresh_token: account.refresh_token,
                    expires_at: account.expires_at,
                    token_type: account.token_type,
                    scope: account.scope,
                    id_token: account.id_token,
                    session_state: account.session_state,
                  },
                ],
              },
            },
            include: { accounts: true }
          });
        }

        return true;
      } catch (error) {
        console.error("Sign-in error:", error);
        return false;
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
