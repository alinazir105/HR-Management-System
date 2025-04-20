import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const PerformanceReviewAdd = () => {
    const [employeeId, setEmployeeId] = useState("");
    const [period, setPeriod] = useState("");
    const [reviewer, setReviewer] = useState("");
    const [rating, setRating] = useState("");
    const [feedback, setFeedback] = useState("");
    const [status, setStatus] = useState("");
    const [reviewedAt, setReviewedAt] = useState("");
    const [goalsSet, setGoalsSet] = useState("");
    const [goalsAchieved, setGoalsAchieved] = useState("");
    const [areasToImprove, setAreasToImprove] = useState("");

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!employeeId) newErrors.employeeId = "Employee ID is required";
        if (!period) newErrors.period = "Period is required";
        if (!reviewer) newErrors.reviewer = "Reviewer is required";
        if (!rating) newErrors.rating = "Rating is required";
        if (!feedback) newErrors.feedback = "Feedback is required";
        if (!status) newErrors.status = "Status is required";
        if (!reviewedAt) newErrors.reviewedAt = "Reviewed date is required";
        if (!goalsSet) newErrors.goalsSet = "Goals set is required";
        if (!goalsAchieved) newErrors.goalsAchieved = "Goals achieved is required";
        if (!areasToImprove) newErrors.areasToImprove = "This field is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) return;

        const reviewData = {
            employeeid: employeeId,
            period,
            reviewer,
            rating,
            feedback,
            status,
            reviewed_at: reviewedAt,
            goals_set: goalsSet,
            goals_achieved: goalsAchieved,
            areas_to_improve: areasToImprove,
        };

        console.log("Submitting review:", reviewData);
        // Add API call or DB logic here
    };

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className="cursor-pointer">
                        <Plus className="mr-2" />
                        Add Review
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Start Performance Review</DialogTitle>
                        <DialogDescription>
                            Fill out the review form and submit.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4 max-h-[40em] overflow-auto pr-4">
                        {/* Employee ID */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="employeeId" className="text-right">Employee ID</Label>
                            <div className="col-span-3">
                                <Input
                                    id="employeeId"
                                    value={employeeId}
                                    onChange={(e) => setEmployeeId(e.target.value)}
                                    className="col-span-3"
                                />
                                {errors.employeeId && <p className="text-red-500 col-span-3 text-sm font-semibold">{errors.employeeId}</p>}
                            </div>
                        </div>

                        {/* Period */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="period" className="text-right">Period</Label>
                            <div className="col-span-3">
                                <Input
                                    id="period"
                                    value={period}
                                    onChange={(e) => setPeriod(e.target.value)}
                                    placeholder="e.g., Q1 2025"
                                    className="col-span-3"
                                />
                                {errors.period && <p className="text-red-500 col-span-4 text-sm font-semibold mt-0.5">{errors.period}</p>}
                            </div>
                        </div>

                        {/* Reviewer */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="reviewer" className="text-right">Reviewer</Label>
                            <Input
                                id="reviewer"
                                value={reviewer}
                                onChange={(e) => setReviewer(e.target.value)}
                                className="col-span-3"
                            />
                            {errors.reviewer && <p className="text-red-500 col-span-4 text-sm ml-[33%]">{errors.reviewer}</p>}
                        </div>

                        {/* Rating Dropdown */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="rating" className="text-right">Rating</Label>
                            <Select onValueChange={(value) => setRating(value)} value={rating}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select rating" />
                                </SelectTrigger>
                                <SelectContent>
                                    {[1, 2, 3, 4, 5].map((num) => (
                                        <SelectItem key={num} value={String(num)}>
                                            {num}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.rating && <p className="text-red-500 col-span-4 text-sm ml-[33%]">{errors.rating}</p>}
                        </div>

                        {/* Feedback */}
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="feedback" className="text-right mt-2">Feedback</Label>
                            <Textarea
                                id="feedback"
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                className="col-span-3"
                            />
                            {errors.feedback && <p className="text-red-500 col-span-4 text-sm ml-[33%]">{errors.feedback}</p>}
                        </div>

                        {/* Status Dropdown */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">Status</Label>
                            <Select onValueChange={(value) => setStatus(value)} value={status}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="in_progress">In Progress</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.status && <p className="text-red-500 col-span-4 text-sm ml-[33%]">{errors.status}</p>}
                        </div>

                        {/* Reviewed At */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="reviewedAt" className="text-right">Reviewed At</Label>
                            <Input
                                id="reviewedAt"
                                type="date"
                                value={reviewedAt}
                                onChange={(e) => setReviewedAt(e.target.value)}
                                className="col-span-3"
                            />
                            {errors.reviewedAt && <p className="text-red-500 col-span-4 text-sm ml-[33%]">{errors.reviewedAt}</p>}
                        </div>

                        {/* Goals Set */}
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="goalsSet" className="text-right mt-2">Goals Set</Label>
                            <Textarea
                                id="goalsSet"
                                value={goalsSet}
                                onChange={(e) => setGoalsSet(e.target.value)}
                                className="col-span-3"
                            />
                            {errors.goalsSet && <p className="text-red-500 col-span-4 text-sm ml-[33%]">{errors.goalsSet}</p>}
                        </div>

                        {/* Goals Achieved */}
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="goalsAchieved" className="text-right mt-2">Goals Achieved</Label>
                            <Textarea
                                id="goalsAchieved"
                                value={goalsAchieved}
                                onChange={(e) => setGoalsAchieved(e.target.value)}
                                className="col-span-3"
                            />
                            {errors.goalsAchieved && <p className="text-red-500 col-span-4 text-sm ml-[33%]">{errors.goalsAchieved}</p>}
                        </div>

                        {/* Areas to Improve */}
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="areasToImprove" className="text-right mt-2">Areas to Improve</Label>
                            <Textarea
                                id="areasToImprove"
                                value={areasToImprove}
                                onChange={(e) => setAreasToImprove(e.target.value)}
                                className="col-span-3"
                            />
                            {errors.areasToImprove && <p className="text-red-500 col-span-4 text-sm ml-[33%]">{errors.areasToImprove}</p>}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" onClick={handleSubmit}>
                            Save Review
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PerformanceReviewAdd;
