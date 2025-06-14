import type {NextAuthConfig} from 'next-auth'
import Google from 'next-auth/providers/google'
import Twitter from 'next-auth/providers/twitter'
import {PrismaAdapter} from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import type {Provider} from "next-auth/providers"
import {PUBLIC_ROUTES} from "@/lib/routes";

const providers: Provider[] = [
    Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    Twitter({
        clientId: process.env.TWITTER_CLIENT_ID,
        clientSecret: process.env.TWITTER_CLIENT_SECRET
    })
];

export const providerMap = providers
    .map((provider) => {
        if (typeof provider === "function") {
            const providerData = provider()
            return {id: providerData.id, name: providerData.name}
        } else {
            return {id: provider.id, name: provider.name}
        }
    })
    .filter((provider) => provider.id !== "credentials")

export const authConfig = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'database',
    },
    pages: {
        signIn: "/signin",
    },
    callbacks: {
        async redirect({url, baseUrl}) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        }
    },
    providers: providers
} satisfies NextAuthConfig
