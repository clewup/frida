"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Switch} from "@/components/ui/switch"
import {Label} from "@/components/ui/label"
import {Button} from "@/components/ui/button"
import {Separator} from "@/components/ui/separator"

interface SettingsSectionProps {
    title: string
}

export function SettingsSection({title}: SettingsSectionProps) {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>Configure your preferences and account settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label htmlFor="email-notifications">Email Notifications</Label>
                                <p className="text-sm text-muted-foreground">Receive email updates about your orders and
                                    account</p>
                            </div>
                            <Switch id="email-notifications" defaultChecked/>
                        </div>
                        <Separator/>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label htmlFor="marketing-emails">Marketing Emails</Label>
                                <p className="text-sm text-muted-foreground">Receive promotional emails and special
                                    offers</p>
                            </div>
                            <Switch id="marketing-emails"/>
                        </div>
                        <Separator/>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                                <p className="text-sm text-muted-foreground">Add an extra layer of security to your
                                    account</p>
                            </div>
                            <Switch id="two-factor"/>
                        </div>
                        <Separator/>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label htmlFor="data-sharing">Data Sharing</Label>
                                <p className="text-sm text-muted-foreground">Allow us to use your data to improve our
                                    services</p>
                            </div>
                            <Switch id="data-sharing" defaultChecked/>
                        </div>
                    </div>
                    <div className="pt-4">
                        <Button>Save Preferences</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
