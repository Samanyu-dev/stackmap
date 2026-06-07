import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "student@stackmap.dev" },
        password: { label: "Password", type: "password", placeholder: "password" }
      },
      async authorize(credentials) {
        // Simple credentials checker for demo
        if (
          credentials?.email === "student@stackmap.dev" &&
          credentials?.password === "password"
        ) {
          return {
            id: "demo-user-id",
            name: "Alex Coder",
            email: "student@stackmap.dev",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
          };
        }
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    }
  }
};
