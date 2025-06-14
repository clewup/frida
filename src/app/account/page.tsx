import {auth} from "@/auth";

export const fetchCache = 'force-no-store';

import React from 'react'
import {AccountDashboard} from "@/components/account-dashboard";
import {redirect} from "next/navigation";

export default async function Account() {
    const session = await auth();

    if (!session?.user) {
        redirect('/signin')
    }

    return (
        <AccountDashboard session={session}/>
    )
}
