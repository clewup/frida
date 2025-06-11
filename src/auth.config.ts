import type { NextAuthConfig } from 'next-auth'
import Google from 'next-auth/providers/google'
import {PrismaAdapter} from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'database',
  },
  providers: [Google({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  })]
} satisfies NextAuthConfig
