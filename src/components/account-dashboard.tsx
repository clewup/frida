"use client"

import * as React from "react"
import {User, Package, Settings, CreditCard, Bell, Shield, LogOut} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarRail,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import {Separator} from "@/components/ui/separator"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {OrdersSection} from "@/components/orders-section"
import {SettingsSection} from "@/components/settings-section"
import {PaymentsSection} from "@/components/payments-section"
import {useSession} from "next-auth/react"
import {signOut} from "@/actions/auth-actions";
import {UserDetail} from "@/components/user-detail";
import {redirect} from "next/navigation";
import {Session} from "next-auth";
import {FC} from "react";
import {IconLogout} from "@tabler/icons-react";

const navigationItems = [
    {
        title: "Profile",
        icon: User,
        key: "profile",
    },
    {
        title: "Orders",
        icon: Package,
        key: "orders",
    },
    {
        title: "Payment Methods",
        icon: CreditCard,
        key: "payment",
    },
    {
        title: "Settings",
        icon: Settings,
        key: "settings",
    },
]

interface Props {
    session: Session
}

export const AccountDashboard: FC<Props> = ({session}) => {
    const [activeSection, setActiveSection] = React.useState("profile")

    const renderContent = () => {
        switch (activeSection) {
            case "profile":
                return <UserDetail user={session.user!}/>
            case "orders":
                return <OrdersSection/>
            case "payment":
                return <PaymentsSection/>
            case "settings":
                return <SettingsSection title="Account Settings"/>
            default:
                return <UserDetail user={session.user!}/>
        }
    }

    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <div className="flex items-center gap-3 px-3 py-2 pt-20">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={session?.user?.image || ""}
                                                 alt={session?.user?.name || ""}/>
                                    <AvatarFallback>{session?.user?.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium">{session?.user?.name}</span>
                                    <span className="text-xs text-muted-foreground">{session?.user?.email}</span>
                                </div>
                            </div>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Account</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {navigationItems.map((item) => (
                                    <SidebarMenuItem key={item.key}>
                                        <SidebarMenuButton isActive={activeSection === item.key}
                                                           onClick={() => setActiveSection(item.key)}>
                                            <item.icon className="h-4 w-4"/>
                                            <span>{item.title}</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <form action={async () => {
                                        await signOut()
                                    }}>
                                        <SidebarMenuButton>
                                            <IconLogout className="h-4 w-4"/>
                                            Sign out
                                        </SidebarMenuButton>
                                    </form>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarRail/>
            </Sidebar>
            <SidebarInset className="bg-transparent">
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1"/>
                    <Separator orientation="vertical" className="mr-2 h-4"/>
                    <h1 className="text-lg font-semibold">
                        {navigationItems.find((item) => item.key === activeSection)?.title || "dashboard"}
                    </h1>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 h-full bg-transparent">{renderContent()}</div>
            </SidebarInset>
        </SidebarProvider>
    )
}
