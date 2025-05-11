import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import ProfileChangePassword from "./ProfileChangePassword"
import { toast } from "sonner"
import api from "@/lib/api"
import LoadingScreen from "@/components/ui/LoadingScreen"
import { Loader2 } from "lucide-react"

const ProfileEditableForm = ({ data }) => {
    const parts = data.name?.split(" ") || [];
    const first = parts[0] || "";
    const second = parts.slice(1).join(" ") || "";
    const [firstName, setFirstName] = useState(first)
    const [firstNameError, setFirstNameError] = useState("")

    const [lastName, setLastName] = useState(second)
    const [lastNameError, setLastNameError] = useState("")


    const [gender, setGender] = useState(data.gender || "")
    const [genderError, setGenderError] = useState("")

    const [isLoading, setIsLoading] = useState(false)

    const validate = () => {
        let valid = true

        if (!firstName.trim()) {
            setFirstNameError("First name is required.")
            valid = false
        } else {
            setFirstNameError("")
        }

        if (!lastName.trim()) {
            setLastNameError("Last name is required.")
            valid = false
        } else {
            setLastNameError("")
        }


        if (!gender) {
            setGenderError("Please select a gender.")
            valid = false
        } else {
            setGenderError("")
        }

        return valid
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (validate()) {
            console.log({ firstName, lastName, gender })
        }
        setIsLoading(true)
        try {
            await api.post("/profile/update-information", { firstName, lastName, gender }, { withCredentials: true })
            toast.success("Profile updated successfully!")
        } catch (e) {
            console.error(e);
            toast.error("Error while updating profile!")
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex-1 flex flex-col gap-2">
            <h2 className="text-xl font-semibold mb-4">Personal Information (Editable)</h2>
            <form onSubmit={handleSubmit} className="space-y-5">

                {/* First Name */}
                <div>
                    <Label htmlFor="firstName" className={"mb-1.5"}>First Name</Label>
                    <Input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => { setFirstName(e.target.value); setFirstNameError("") }}
                    />
                    {firstNameError && (
                        <p className="text-red-600 font-semibold text-left text-sm mt-0.5">{firstNameError}</p>
                    )}
                </div>

                {/* Last Name */}
                <div>
                    <Label htmlFor="lastName" className={"mb-2"}>Last Name</Label>
                    <Input
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) => { setLastName(e.target.value); setLastNameError("") }}
                    />
                    {lastNameError && (
                        <p className="text-red-600 font-semibold text-left text-sm mt-0.5">{lastNameError}</p>
                    )}
                </div>

                {/* Gender */}
                <div>
                    <Label htmlFor="gender" className={"mb-2"}>Gender</Label>
                    <Select onValueChange={(value) => { setGender(value); setGenderError("") }} value={gender}>
                        <SelectTrigger id="gender" className={"w-full"}>
                            <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                    {genderError && (
                        <p className="text-red-600 font-semibold text-left text-sm mt-0.5">{genderError}</p>
                    )}
                </div>


                <Button type="submit" disabled={!firstName || !lastName || !gender || isLoading} className="mt-2 w-full cursor-pointer hover:bg-blue-700 bg-blue-600 font-semibold">{(!firstName || !lastName || !gender) ? "Cannot Make Changes" : "Save Changes"}</Button>
            </form>
            <div className="mt-6 border border-red-300 rounded-lg p-4 bg-red-50">
                <h3 className="text-lg font-semibold mb-1 text-red-800">Security Zone</h3>
                <p className="text-sm text-red-700 mb-6">
                    Changing your password regularly helps protect your account. Make sure you choose a strong, unique password.
                </p>
                <div>
                    <ProfileChangePassword passwordLastChanged={data.password_last_changed} />
                </div>
            </div>

        </div>
    )
}

export default ProfileEditableForm
