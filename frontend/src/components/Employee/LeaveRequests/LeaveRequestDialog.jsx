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

const today = new Date().toISOString().split("T")[0];

const LeaveRequestDialog = ({ setRefreshData }) => {
    const [leaveType, setLeaveType] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [reason, setReason] = useState("")
    const [leaveTypeError, setLeaveTypeError] = useState("")
    const [startDateError, setStartDateError] = useState("")
    const [endDateError, setEndDateError] = useState("")
    const [reasonError, setReasonError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const [isOpen, setIsOpen] = useState(false);

    function handleReset() {
        setLeaveType("")
        setEndDate("")
        setStartDate("")
        setReason("")
        setLeaveTypeError("")
        setStartDateError("")
        setEndDateError("")
        setReasonError("")
    }

    const handleSubmit = async () => {
        let valid = true;

        setLeaveTypeError("");
        setStartDateError("");
        setEndDateError("");
        setReasonError("");

        if (!leaveType) {
            setLeaveTypeError("Leave type cannot be empty");
            valid = false;
        }

        if (!startDate) {
            setStartDateError("Start date is required");
            valid = false;
        } else if (new Date(startDate) < new Date(today)) {
            setStartDateError("Start date cannot be in the past");
            valid = false;
        }

        if (!endDate) {
            setEndDateError("End date is required");
            valid = false;
        } else if (new Date(endDate) < new Date(startDate)) {
            setEndDateError("End date cannot be before start date");
            valid = false;
        }

        if (!reason.trim()) {
            setReasonError("Reason cannot be empty");
            valid = false;
        }

        if (valid) {
            let response;
            try {
                setIsLoading(true)
                response = await api.post("/leaves/submit-leave", { leaveType, startDate, endDate, reason }, { withCredentials: true })
                toast.success(response.data.message)
                setRefreshData(true)
                handleReset()
                setIsOpen(false)
            }
            catch (e) {
                console.error(e);

                toast.error(e?.response.data.message)
            }
            finally {
                setIsLoading(false)
            }
        }
    };


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="cursor-pointer">Apply For Leave</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Request for Leave</DialogTitle>
                    <DialogDescription>
                        Fill out the form to submit a leave request.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    {/* Leave Type */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="leave-type">Type</Label>
                        <Select value={leaveType} onValueChange={(value) => {
                            setLeaveType(value)
                            setLeaveTypeError("")
                        }}>
                            <SelectTrigger className="col-span-3" id="leave-type">
                                <SelectValue placeholder="Select leave type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                                <SelectItem value="Casual Leave">Casual Leave</SelectItem>
                                <SelectItem value="Annual Leave">Annual Leave</SelectItem>
                                <SelectItem value="Parental Leave">Parental Leave</SelectItem>
                            </SelectContent>
                        </Select>
                        {leaveTypeError && <p className="text-sm font-semibold ml-29 text-red-600 col-span-4 -mt-2">{leaveTypeError}</p>}
                    </div>

                    {/* Start Date */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="start-date" >Start Date</Label>
                        <Input
                            id="start-date"
                            type="date"
                            className="col-span-3"
                            value={startDate}
                            onChange={(e) => {
                                setStartDate(e.target.value)
                                setStartDateError("")
                            }}
                            min={today}
                        />
                        {startDateError && <p className="text-sm font-semibold ml-29 text-red-600 col-span-4 -mt-2">{startDateError}</p>}
                    </div>

                    {/* End Date */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="end-date">End Date</Label>
                        <Input
                            id="end-date"
                            type="date"
                            className="col-span-3"
                            value={endDate}
                            onChange={(e) => {
                                setEndDate(e.target.value)
                                setEndDateError("")
                            }}
                            min={today}
                        />
                        {endDateError && <p className="text-sm font-semibold ml-29 text-red-600 col-span-4 -mt-2">{endDateError}</p>}
                    </div>

                    {/* Reason */}
                    <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor="reason" className=" pt-2">Reason</Label>
                        <Textarea
                            id="reason"
                            className="col-span-3"
                            placeholder="Write your reason here..."
                            value={reason}
                            onChange={(e) => {
                                setReason(e.target.value)
                                setReasonError("")
                            }}
                        />
                        {reasonError && <p className="text-sm font-semibold ml-29 text-red-600 col-span-4 -mt-2">{reasonError}</p>}
                    </div>
                </div>

                <DialogFooter>
                    <Button disabled={isLoading} onClick={handleReset} variant={"outline"} className={"cursor-pointer font-semibold"}>Reset Form</Button>
                    <Button disabled={isLoading} onClick={handleSubmit} className={"cursor-pointer font-semibold"}>{isLoading && <Loader2 className='animate-spin' />} Submit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default LeaveRequestDialog
