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
import { toast } from "sonner";
import api from "@/lib/api";

const PerformanceReviewAdd = ({ allPerformanceReviews }) => {
    const uniqueEmployees = Array.from(
        new Map(
            allPerformanceReviews.map((review) => [review.employeeid, { id: review.employeeid, name: review.name }])
        ).values()
    );

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
        if (!status) newErrors.status = "Status is required";

        if (status === "completed") {
            if (!rating) newErrors.rating = "Rating is required";
            if (!feedback) newErrors.feedback = "Feedback is required";
            if (!reviewedAt) newErrors.reviewedAt = "Reviewed date is required";
            if (!goalsSet) newErrors.goalsSet = "Goals set is required";
            if (!goalsAchieved) newErrors.goalsAchieved = "Goals achieved is required";
            if (!areasToImprove) newErrors.areasToImprove = "This field is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
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

        try {
            const response = await api.post("/performance/add", reviewData, { withCredentials: true })
            toast.success(response.data.message);
        } catch (e) {
            console.error(e);
            toast.error(e?.response.data.message)
        }
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
                <DialogContent className="max-h-[80%] overflow-auto sm:w-full">
                    <DialogHeader>
                        <DialogTitle>Start Performance Review</DialogTitle>
                        <DialogDescription>
                            Fill out the review form and submit.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4 overflow-auto pr-4">
                        {/* Employee ID */}
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="employeeId" className={"mt-2"}>
                                Employee ID
                            </Label>
                            <div className="col-span-3">
                                <Select
                                    onValueChange={(value) => {
                                        setEmployeeId(value);
                                        setErrors({ ...errors, employeeId: "" });
                                    }}
                                    value={employeeId}
                                >
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select employee" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {uniqueEmployees.map((emp) => (
                                            <SelectItem key={emp.id} value={emp.id}>
                                                {emp.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.employeeId && (
                                    <p className="text-red-500 col-span-3 text-sm font-semibold">
                                        {errors.employeeId}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Period */}
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="period" className={"mt-2"}>
                                Period
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    id="period"
                                    value={period}
                                    onChange={(e) => {
                                        setPeriod(e.target.value);
                                        setErrors({ ...errors, period: "" })
                                    }}
                                    placeholder="e.g., Q1 2025"
                                    className="col-span-3"
                                />
                                {errors.period && (
                                    <p className="text-red-500 col-span-4 text-sm font-semibold mt-0.5">
                                        {errors.period}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Reviewer */}
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="reviewer" className={"mt-2"}>
                                Reviewer
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    id="reviewer"
                                    value={reviewer}
                                    onChange={(e) => {
                                        setReviewer(e.target.value);
                                        setErrors({ ...errors, reviewer: "" })
                                    }}
                                    className="col-span-3"
                                />
                                {errors.reviewer && (
                                    <p className="text-red-500 col-span-4 text-sm font-semibold mt-0.5">
                                        {errors.reviewer}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Rating Dropdown */}
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="rating" className={"mt-2"}>
                                Rating
                            </Label>
                            <div className="col-span-3">
                                <Select
                                    onValueChange={(value) => {
                                        setRating(value);
                                        setErrors({ ...errors, rating: "" })
                                    }}
                                    value={rating}
                                >
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
                                {errors.rating && (
                                    <p className="text-red-500 col-span-4 text-sm font-semibold mt-0.5">
                                        {errors.rating}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Feedback */}
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="feedback" className=" mt-2">
                                Feedback
                            </Label>
                            <div className="col-span-3">
                                <Textarea
                                    id="feedback"
                                    value={feedback}
                                    onChange={(e) => {
                                        setFeedback(e.target.value);
                                        setErrors({ ...errors, feedback: "" })
                                    }}
                                    className="col-span-3"
                                />
                                {errors.feedback && (
                                    <p className="text-red-500 col-span-4 text-sm font-semibold mt-0.5">
                                        {errors.feedback}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Status Dropdown */}
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="status" className={"mt-2"}>
                                Status
                            </Label>
                            <div className="col-span-3">
                                <Select
                                    onValueChange={(value) => {
                                        setStatus(value);
                                        setErrors({ ...errors, status: "" })
                                    }}
                                    value={status}
                                >
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="completed">Completed</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="in_progress">In Progress</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.status && (
                                    <p className="text-red-500 col-span-4 text-sm font-semibold mt-0.5">
                                        {errors.status}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Reviewed At */}
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="reviewedAt" className={"mt-2"}>
                                Reviewed At
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    id="reviewedAt"
                                    type="date"
                                    value={reviewedAt}
                                    onChange={(e) => {
                                        setReviewedAt(e.target.value);
                                        setErrors({ ...errors, reviewedAt: "" })
                                    }}
                                    className="col-span-3"
                                />
                                {errors.reviewedAt && (
                                    <p className="text-red-500 col-span-4 text-sm font-semibold mt-0.5">
                                        {errors.reviewedAt}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Goals Set */}
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="goalsSet" className=" mt-2">
                                Goals Set
                            </Label>
                            <div className="col-span-3">
                                <Textarea
                                    id="goalsSet"
                                    value={goalsSet}
                                    onChange={(e) => {
                                        setGoalsSet(e.target.value);
                                        setErrors({ ...errors, goalsSet: "" })
                                    }}
                                    className="col-span-3"
                                />
                                {errors.goalsSet && (
                                    <p className="text-red-500 col-span-4 text-sm font-semibold mt-0.5">
                                        {errors.goalsSet}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Goals Achieved */}
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="goalsAchieved" className=" mt-2">
                                Goals Achieved
                            </Label>
                            <div className="col-span-3">
                                <Textarea
                                    id="goalsAchieved"
                                    value={goalsAchieved}
                                    onChange={(e) => {
                                        setGoalsAchieved(e.target.value)
                                        setErrors({ ...errors, goalsAchieved: "" })
                                    }}
                                    className="col-span-3"
                                />
                                {errors.goalsAchieved && (
                                    <p className="text-red-500 col-span-4 text-sm font-semibold mt-0.5">
                                        {errors.goalsAchieved}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Areas to Improve */}
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="areasToImprove" className="mt-2">
                                Areas to Improve
                            </Label>
                            <div className="col-span-3">
                                <Textarea
                                    id="areasToImprove"
                                    value={areasToImprove}
                                    onChange={(e) => {
                                        setAreasToImprove(e.target.value);
                                        setErrors({ ...errors, areasToImprove: "" })
                                    }}
                                    className="col-span-3"
                                />
                                {errors.areasToImprove && (
                                    <p className="text-red-500 col-span-4 text-sm font-semibold mt-0.5">
                                        {errors.areasToImprove}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            onClick={handleSubmit}
                            className={"cursor-pointer"}
                        >
                            Save Review
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PerformanceReviewAdd;
