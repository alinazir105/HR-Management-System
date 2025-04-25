import { useEffect, useState } from "react";
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
import { Loader2, Minus, Pencil, Plus } from "lucide-react";
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

const PerformanceReviewEdit = ({
  review,
  setRefreshData,
}) => {
  const [employeeId, setEmployeeId] = useState(review.employeeid || "");
  const [period, setPeriod] = useState(review.period || "");
  const [reviewer, setReviewer] = useState(review.reviewer || "");
  const [rating, setRating] = useState(Number(review.rating?.split(".")[0]) || null);
  const [feedback, setFeedback] = useState(review.feedback || "");
  const [status, setStatus] = useState(review.status || "");
  const [reviewedAt, setReviewedAt] = useState(() => {
    const date = new Date(review.reviewed_at);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return review.reviewed_at ? `${yyyy}-${mm}-${dd}` : null;
  });
  const [goalsSet, setGoalsSet] = useState(review.goals_set || [""]);
  const [goalsAchieved, setGoalsAchieved] = useState(review.goals_achieved || []);
  const [areasToImprove, setAreasToImprove] = useState(
    (review.areas_to_improve || []).join(", ")
  );

  const [errors, setErrors] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setEmployeeId(review.employeeid || "");
      setPeriod(review.period || "");
      setReviewer(review.reviewer || "");
      setRating(Number(review.rating?.split(".")[0]) || null);
      setFeedback(review.feedback || "");
      setStatus(review.status || "");
      setReviewedAt(() => {
        const date = new Date(review.reviewed_at);
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        return review.reviewed_at ? `${yyyy}-${mm}-${dd}` : null;
      });
      setGoalsSet(review.goals_set || [""]);
      setGoalsAchieved(review.goals_achieved || []);
      setAreasToImprove((review.areas_to_improve || []).join(", "));
      setErrors({});
    }
  }, [isOpen, review]);

  const validateForm = () => {
    const newErrors = {};
    if (!period) newErrors.period = "Period is required";
    if (!reviewer) newErrors.reviewer = "Reviewer is required";
    if (!status) newErrors.status = "Status is required";

    if (status === "reviewed") {
      if (!rating) newErrors.rating = "Rating is required";
      if (!feedback) newErrors.feedback = "Feedback is required";
      if (!reviewedAt) newErrors.reviewedAt = "Reviewed date is required";
      if (!goalsSet) newErrors.goalsSet = "Goals set is required";
      if (!goalsAchieved)
        newErrors.goalsAchieved = "Goals achieved is required";
      if (!areasToImprove) newErrors.areasToImprove = "This field is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const reviewData = {
      id: review.id,
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
      setIsLoading(true);
      const response = await api.post("/performance/edit", reviewData, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      setRefreshData(true);
      setIsOpen(false);
    } catch (e) {
      console.error(e);
      toast.error(e?.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoalChange = (index, value) => {
    const updatedGoals = [...goalsSet];
    updatedGoals[index] = value;
    setGoalsSet(updatedGoals);
  };

  const addGoal = () => {
    setGoalsSet([...goalsSet, ""]);
  };

  const removeGoal = (index) => {
    if (goalsSet.length > 1) {
      const updatedGoals = goalsSet.filter((_, i) => i !== index);
      setGoalsSet(updatedGoals);
    }
  };

  const toggleAchieved = (goal) => {
    setGoalsAchieved((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className="hover:bg-muted"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[80%] overflow-auto sm:w-full">
          <DialogHeader>
            <DialogTitle>Edit Performance Review</DialogTitle>
            <DialogDescription>
              Edit out the review details and submit.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4 overflow-auto pr-4">
            {/* Employee ID */}
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="employeeId" className={"mt-2"}>
                Employee
              </Label>
              <div className="col-span-3">
                <Select
                  onValueChange={(value) => {
                    setEmployeeId(value);
                    setErrors({ ...errors, employeeId: "" });
                  }}
                  value={employeeId}
                  disabled
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select employee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={review.employeeid} disabled>{review.name}</SelectItem>
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
                    setErrors({ ...errors, period: "" });
                  }}
                  placeholder="e.g., Jan-Mar 2025"
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
                    setErrors({ ...errors, reviewer: "" });
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
                    setErrors({ ...errors, rating: "" });
                  }}
                  value={rating}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <SelectItem key={num} value={num}>
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
                    setErrors({ ...errors, feedback: "" });
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
                    setErrors({ ...errors, status: "" });
                  }}
                  value={status}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reviewed">Reviewed</SelectItem>
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
                    setErrors({ ...errors, reviewedAt: "" });
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
              <Label htmlFor="goalsSet" className="mt-2">
                Goals Set
              </Label>
              <div className="col-span-3">
                {goalsSet.map((goal, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <Input
                      type="text"
                      placeholder={`Goal ${index + 1}`}
                      value={goal}
                      onChange={(e) => handleGoalChange(index, e.target.value)}
                      className="p-2 border rounded w-full"
                    />
                    {goalsSet.length > 1 && (
                      <Button
                        onClick={() => removeGoal(index)}
                        variant={"outline"}
                        className="ml-2 rounded-md cursor-pointer"
                      >
                        -
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  onClick={addGoal}
                  variant={"outline"}
                  className="font-semibold text-sm  rounded-md cursor-pointer"
                >
                  <Plus />
                  Add Goal
                </Button>
              </div>
            </div>

            {/* Goals Achieved */}
            <div className="mt-2 grid grid-cols-4 items-start gap-4">
              <Label htmlFor="goalsAchieved" className="mt-2">
                Goals Achieved
              </Label>
              <div className="flex flex-wrap gap-2 col-span-3">
                {goalsSet.every((goal) => goal.trim() === "") ? (
                  <span className="px-4 py-2 rounded-full text-sm bg-transparent text-neutral-600 font-medium cursor-default border border-neutral-300">
                    No goals set
                  </span>
                ) : (
                  goalsSet.map(
                    (goal, index) =>
                      goal.trim() !== "" && (
                        <Button
                          key={index}
                          onClick={() => toggleAchieved(goal)}
                          className={`px-4 py-2 rounded-full text-sm transition-all duration-200 border font-semibold cursor-pointer
                ${goalsAchieved.includes(goal)
                              ? "bg-emerald-600 border-emerald-700 text-white hover:bg-emerald-700 hover:border-emerald-800"
                              : "bg-transparent text-foreground hover:bg-neutral-100 hover:border-neutral-400"
                            }`}
                        >
                          {goal}
                        </Button>
                      )
                  )
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
                  placeholder={"Comma Separated"}
                  onChange={(e) => {
                    setAreasToImprove(e.target.value);
                    setErrors({ ...errors, areasToImprove: "" });
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
              disabled={isLoading}
              onClick={handleSubmit}
              className={"cursor-pointer font-semibold"}
            >
              {isLoading && <Loader2 className="animate-spin" />}
              Edit Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PerformanceReviewEdit;
