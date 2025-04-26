import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Pencil, Plus } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import api from '@/lib/api'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select"

const RecruitmentJobEdit = ({ job, setRefresh }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [skillsRequired, setSkillsRequired] = useState("");
    const [experienceRequired, setExperienceRequired] = useState(0);
    const [openings, setOpenings] = useState(0);
    const [jobType, setJobType] = useState("");
    const [deadline, setDeadline] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const [errors, setErrors] = useState({
        title: "",
        description: "",
        location: "",
        skillsRequired: "",
        experienceRequired: "",
        openings: "",
        jobType: "",
        deadline: ""
    });

    useEffect(() => {
        if (isOpen) {
            setTitle(job.title)
            setDescription(job.description)
            setLocation(job.location)
            setSkillsRequired(job.skills_required)
            setExperienceRequired(job.experience_required)
            setOpenings(job.openings)
            setJobType(job.job_type)
            setDeadline(() => {
                const date = new Date(job.deadline);
                const yyyy = date.getFullYear();
                const mm = String(date.getMonth() + 1).padStart(2, '0');
                const dd = String(date.getDate()).padStart(2, '0');
                return job.deadline ? `${yyyy}-${mm}-${dd}` : "";
            })
            setErrors({})
        }
    }, [isOpen, job])


    const validateForm = () => {
        let valid = true;
        const newErrors = { ...errors };

        newErrors.title = title ? "" : "Title is required";
        newErrors.description = description ? "" : "Description is required";
        newErrors.location = location ? "" : "Location is required";
        newErrors.skillsRequired = skillsRequired ? "" : "Skills are required";
        newErrors.experienceRequired = experienceRequired && !isNaN(experienceRequired) && experienceRequired >= 0 ? "" : "Experience is required and should be a number";
        newErrors.openings = openings && !isNaN(openings) && openings >= 0 ? "" : "Openings is required and should be a number";
        newErrors.jobType = jobType ? "" : "Job type is required";
        newErrors.deadline = deadline ? "" : "Deadline is required";

        setErrors(newErrors);

        Object.values(newErrors).forEach((error) => {
            if (error) valid = false;
        });

        return valid;
    };

    const handleEditJob = async () => {
        if (validateForm()) {
            setIsLoading(true)
            try {
                const response = await api.post("/recruitment/edit-job", {
                    id: job.id,
                    title,
                    description,
                    location,
                    skillsRequired,
                    experienceRequired,
                    openings,
                    jobType,
                    deadline
                }, { withCredentials: true })
                toast.success(response.data.message)
                setIsOpen(false);
                setRefresh(true)

            } catch (e) {
                console.log(e);
                toast.error(e?.response?.data?.message || "Something went wrong")
            }
            finally {
                setIsLoading(false)
            }
        }
    };

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>

                <DialogTrigger asChild>
                    <Button variant={"outline"} className={"cursor-pointer"}>
                        <Pencil />

                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Add New Job</DialogTitle>
                        <DialogDescription>
                            Make changes for the job and click save to edit it.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="title" className="text-left mt-2">Job Title</Label>
                            <div className='col-span-3'>
                                <Input
                                    id="title"
                                    value={title}
                                    onChange={(e) => { setTitle(e.target.value); setErrors({ ...errors, "title": "" }) }}
                                />
                                {errors.title && <p className="text-red-500 text-sm font-semibold">{errors.title}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="description" className="text-left mt-2">Job Description</Label>
                            <div className='col-span-3'>
                                <Textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => { setDescription(e.target.value); setErrors({ ...errors, "description": "" }) }}
                                    className="col-span-3"
                                />
                                {errors.description && <p className="text-red-500 text-sm font-semibold">{errors.description}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="jobType" className="text-left mt-2">Job Type</Label>
                            <div className="col-span-3">
                                <Select value={jobType} onValueChange={(value) => { setJobType(value); setErrors({ ...errors, jobType: "" }) }}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select job type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Part-time">Part-time</SelectItem>
                                        <SelectItem value="Full-time">Full-time</SelectItem>
                                        <SelectItem value="Contract">Contract</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.jobType && <p className="text-red-500 text-sm font-semibold">{errors.jobType}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="location" className="text-left mt-2">Location</Label>
                            <div className='col-span-3'>
                                <Select value={location} onValueChange={(value) => { setLocation(value); setErrors({ ...errors, location: "" }) }}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select location" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Onsite">Onsite</SelectItem>
                                        <SelectItem value="Remote">Remote</SelectItem>
                                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.location && <p className="text-red-500 text-sm font-semibold">{errors.location}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="skillsRequired" className="text-left mt-2">Skills Required</Label>
                            <div className='col-span-3'>
                                <Textarea
                                    id="skillsRequired"
                                    value={skillsRequired}
                                    placeholder={"Comma-separated"}
                                    onChange={(e) => { setSkillsRequired(e.target.value); setErrors({ ...errors, "skillsRequired": "" }) }}
                                    className="col-span-3"
                                />
                                {errors.skillsRequired && <p className="text-red-500 text-sm font-semibold">{errors.skillsRequired}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="experienceRequired" className="text-left mt-2">Experience (Years)</Label>
                            <div className='col-span-3'>
                                <Input
                                    id="experienceRequired"
                                    type={"number"}
                                    value={experienceRequired}
                                    onChange={(e) => { setExperienceRequired(Number(e.target.value)); setErrors({ ...errors, "experienceRequired": "" }) }}
                                    className="col-span-3"
                                />
                                {errors.experienceRequired && <p className="text-red-500 text-sm font-semibold">{errors.experienceRequired}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="openings" className="text-left mt-2">Number of Openings</Label>
                            <div className="col-span-3">
                                <Input
                                    id="openings"
                                    type="number"
                                    value={openings}
                                    onChange={(e) => { setOpenings(Number(e.target.value)); setErrors({ ...errors, openings: "" }) }}
                                    className="col-span-3"
                                />
                                {errors.openings && <p className="text-red-500 text-sm font-semibold">{errors.openings}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="deadline" className="text-left mt-2">Application Deadline</Label>
                            <div className="col-span-3">
                                <Input
                                    id="deadline"
                                    type="date"
                                    value={deadline}
                                    onChange={(e) => { setDeadline(e.target.value); setErrors({ ...errors, deadline: "" }) }}
                                />
                                {errors.deadline && <p className="text-red-500 text-sm font-semibold">{errors.deadline}</p>}
                            </div>
                        </div>

                        <DialogFooter>
                            <Button disabled={isLoading} onClick={handleEditJob} className={"cursor-pointer"}>{isLoading && <Loader2 className='animate-spin' />} Edit Job</Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default RecruitmentJobEdit;

