import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import api from '@/lib/api'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

const ProfileChangePassword = ({ passwordLastChanged }) => {
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [reEnterPassword, setReEnterPassword] = useState("")

    const [currentPasswordError, setCurrentPasswordError] = useState("")
    const [newPasswordError, setNewPasswordError] = useState("")
    const [reEnterPasswordError, setReEnterPasswordError] = useState("")

    const validate = () => {
        let isValid = true

        if (!currentPassword) {
            setCurrentPasswordError("Current password is required.")
            isValid = false
        } else {
            setCurrentPasswordError("")
        }

        if (!newPassword || newPassword.length < 6) {
            setNewPasswordError("New password must be at least 6 characters.")
            isValid = false
        } else {
            setNewPasswordError("")
        }

        if (reEnterPassword !== newPassword) {
            setReEnterPasswordError("Passwords do not match.")
            isValid = false
        } else {
            setReEnterPasswordError("")
        }

        return isValid
    }

    const handleSubmit = async () => {
        if (validate()) {
            setIsLoading(true)
            try {
                const response = await api.post("/profile/update-password", { currentPassword, newPassword }, { withCredentials: true })
                toast.success(response.data.message)
                setOpen(false)
                setCurrentPassword("")
                setNewPassword("")
                setReEnterPassword("")
            } catch (e) {
                console.error(e)
                toast.error(e.response?.data?.message || "An error occurred")
            }
            finally {
                setIsLoading(false)
            }
        }
    }

    const handleOpenDialog = async () => {

        const lastChangedDate = new Date(passwordLastChanged)
        const now = new Date()

        const diffInMs = now.getTime() - lastChangedDate.getTime()
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24)

        if (diffInDays >= 7) {
            setOpen(true)
        } else {
            const remainingDays = Math.ceil(7 - diffInDays)
            toast.warning(`You can change your password in ${remainingDays} day(s).`)
        }
    }


    return (
        <>
            <Button
                variant="outline"
                className="w-full cursor-pointer text-red-600 border-red-600 hover:bg-red-100 hover:text-red-700"
                onClick={handleOpenDialog}
            >
                Change Password
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Change Password</DialogTitle>
                        <DialogDescription>
                            Please provide your current and new password.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        {/* Current Password */}
                        <div className="grid grid-cols-4 items-start">
                            <Label htmlFor="currentPassword" className="text-left mt-2">
                                Current
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    id="currentPassword"
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => { setCurrentPassword(e.target.value); setCurrentPasswordError("") }}
                                />
                                {currentPasswordError && (
                                    <p className="text-sm text-red-600 font-semibold mb-1">{currentPasswordError}</p>
                                )}
                            </div>
                        </div>

                        {/* New Password */}
                        <div className="grid grid-cols-4 items-start">
                            <Label htmlFor="newPassword" className="text-left mt-2">
                                New
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    id="newPassword"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => { setNewPassword(e.target.value); setNewPasswordError("") }}
                                />
                                {newPasswordError && (
                                    <p className="text-sm text-red-600 font-semibold mb-1">{newPasswordError}</p>
                                )}
                            </div>
                        </div>

                        {/* Re-enter Password */}
                        <div className="grid grid-cols-4 items-start">
                            <Label htmlFor="reEnterPassword" className="text-left mt-2">
                                Re-enter
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    id="reEnterPassword"
                                    type="password"
                                    value={reEnterPassword}
                                    onChange={(e) => { setReEnterPassword(e.target.value); setReEnterPasswordError("") }}
                                />
                                {reEnterPasswordError && (
                                    <p className="text-sm text-red-600 font-semibold mb-1">{reEnterPasswordError}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" onClick={handleSubmit} className="cursor-pointer" disabled={isLoading}>
                            {isLoading && <Loader2 className='animate-spin' />}
                            Save changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ProfileChangePassword
