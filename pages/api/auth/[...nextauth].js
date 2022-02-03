import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
var bcrypt = require("bcryptjs");

import { prisma } from "@/libs/prisma";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        if (credentials) {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user) {
            throw new Error("Email");
          } else if (!bcrypt.compareSync(credentials.password, user.hash)) {
            throw new Error("Password");
          } else {
            return user;
          }
        }
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token }) {
      return { user: token.user, expires: session.expires };
    },
  },
});
