import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter:PrismaAdapter(prisma as any),
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
async authorize(credentials) {
  console.log("--- AUTH DEBUG START ---");
  console.log("Login attempt for:", credentials?.email);

  if (!credentials?.email || !credentials?.password) {
    console.log("Error: Missing email or password in request");
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { email: credentials.email as string }
  });

  if (!user) {
    console.log("Error: No user found in database with this email.");
    return null;
  }

  console.log("User found in DB. Comparing passwords...");
  
  const valid = await bcrypt.compare(credentials.password as string, user.password!);
  
  if (!valid) {
    console.log("Error: Password mismatch.");
    // TEMPORARY: Log a fresh hash so you can put it in your DB
    const freshHash = await bcrypt.hash(credentials.password as string, 10);
    console.log("Tip: If you want this password to work, put this hash in your DB:", freshHash);
    return null;
  }

  console.log("Login successful!");
  console.log("--- AUTH DEBUG END ---");
  
  return { id: user.id, email: user.email, name: user.name };
},
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // ✅ persist id
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string; // ✅ available in API
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
});
