"use client"

import {FC, useState} from "react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Badge} from "@/components/ui/badge"
import {Camera, Save} from "lucide-react"
import {useSession} from "next-auth/react";
import {User} from "next-auth"

interface Props {
    user: User;
}

export const UserDetail: FC<Props> = ({user}) => {
    const session = useSession();

    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({
        name: user.name || "",
        email: user.email || "",
    })

    const handleSave = () => {
        // Here you would typically make an API call to update the user profile
        console.log("Saving profile:", formData)
        setIsEditing(false)
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Manage your personal information and preferences.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={user.image || ""} alt={user.name || ""}/>
                                <AvatarFallback
                                    className="text-lg">{user.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                            </Avatar>
                            <Button size="icon" variant="outline"
                                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full">
                                <Camera className="h-4 w-4"/>
                            </Button>
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-lg font-medium">{user.name}</h3>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                            <Badge variant="secondary">Verified Account</Badge>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                disabled={!isEditing}
                            />
                        </div>
                    </div>

                    {/*<div className="flex gap-2">*/}
                    {/*    {isEditing ? (*/}
                    {/*        <>*/}
                    {/*            <Button onClick={handleSave}>*/}
                    {/*                <Save className="mr-2 h-4 w-4"/>*/}
                    {/*                Save Changes*/}
                    {/*            </Button>*/}
                    {/*            <Button variant="outline" onClick={() => setIsEditing(false)}>*/}
                    {/*                Cancel*/}
                    {/*            </Button>*/}
                    {/*        </>*/}
                    {/*    ) : (*/}
                    {/*        <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>*/}
                    {/*    )}*/}
                    {/*</div>*/}
                </CardContent>
            </Card>
        </div>
    )
}
