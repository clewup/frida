"use server"

import {signOut as signOutServer} from "@/auth";

export async function signOut() {
    return signOutServer({redirectTo: '/'});
}