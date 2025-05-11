import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import api from '@/lib/api'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

const AnnouncementsDialog = ({ setRefreshData, setIsAdding }) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [type, setType] = useState("")

    const [titleError, setTitleError] = useState("")
    const [descriptionError, setDescriptionError] = useState("")
    const [typeError, setTypeError] = useState("")

    function handleReset() {
        setTitle("")
        setDescription("")
        setType("")
        setTitleError("")
        setDescriptionError("")
        setTypeError("")
    }

    const handleSubmit = async () => {
        let valid = true;

        setTitleError("")
        setDescriptionError("")
        setTypeError("")

        if (!title.trim()) {
            setTitleError("Title cannot be empty");
            valid = false;
        }

        if (!description.trim()) {
            setDescriptionError("Description cannot be empty");
            valid = false;
        }

        if (!type) {
            setTypeError("Please select a type");
            valid = false;
        }

        if (valid) {
            setIsAdding(true)
            try {
                const response = await api.post("/announcements/add", { title, description, type }, { withCredentials: true })
                toast.success(response.data.message)
                handleReset()
                setRefreshData(true)
            } catch (e) {
                console.error(e);

                toast.error("Error while submitting announcement. Please try again later!")
            }
            finally {
                setIsAdding(false)
            }
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="cursor-pointer">Make Announcement</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>New Announcement</DialogTitle>
                    <DialogDescription>
                        Fill out the form to post an announcement.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    {/* Title */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            className="col-span-3"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value)
                                setTitleError("")
                            }}
                            placeholder="Enter announcement title"
                        />
                        {titleError && <p className="text-sm font-semibold ml-29 text-red-600 col-span-4 -mt-2">{titleError}</p>}
                    </div>

                    {/* Type */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="type">Type</Label>
                        <Select value={type} onValueChange={(value) => {
                            setType(value)
                            setTypeError("")
                        }}>
                            <SelectTrigger className="col-span-3" id="type">
                                <SelectValue placeholder="Select announcement type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="General">General</SelectItem>
                                <SelectItem value="Urgent">Urgent</SelectItem>
                                <SelectItem value="Event">Event</SelectItem>
                            </SelectContent>
                        </Select>
                        {typeError && <p className="text-sm font-semibold ml-29 text-red-600 col-span-4 -mt-2">{typeError}</p>}
                    </div>

                    {/* Description */}
                    <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor="description" className="pt-2">Description</Label>
                        <Textarea
                            id="description"
                            className="col-span-3"
                            placeholder="Write the announcement details here..."
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value)
                                setDescriptionError("")
                            }}
                        />
                        {descriptionError && <p className="text-sm font-semibold ml-29 text-red-600 col-span-4 -mt-2">{descriptionError}</p>}
                    </div>
                </div>

                <DialogFooter>
                    <Button onClick={handleReset} variant={"outline"} className="cursor-pointer font-semibold">Reset Form</Button>
                    <Button onClick={handleSubmit} className="cursor-pointer font-semibold" >Submit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AnnouncementsDialog
