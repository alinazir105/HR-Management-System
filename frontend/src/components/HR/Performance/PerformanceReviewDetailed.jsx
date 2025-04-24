import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PerformanceReviewDetailed = ({ review }) => {
  const displayArray = (arr) => {
    return arr && arr.length > 0 ? (
      <div className="flex flex-wrap gap-1.5">
        {arr.map((item, idx) => (
          <Badge
            key={idx}
            className="rounded-full bg-neutral-100 border border-neutral-300 px-3 py-1 text-xs text-gray-700"
          >
            {item}
          </Badge>
        ))}
      </div>
    ) : (
      <p className="text-sm text-muted-foreground">None</p>
    );
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "Not available";
    return new Date(dateStr).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <Drawer>
      <DrawerTrigger>
        <Button size="icon" variant="outline" className="hover:bg-muted">
          <Eye className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-full max-w-3xl mx-auto rounded-t-xl shadow-lg pb-4">
        <DrawerHeader className="pb-2 border-b">
          <DrawerTitle className="text-xl font-bold tracking-tight">
            Performance Review
          </DrawerTitle>
          <DrawerDescription>
            Period: <span className="font-medium">{review?.period}</span>
          </DrawerDescription>
        </DrawerHeader>
        <div className="overflow-auto">
          <div className="px-6 py-4 grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-foreground">Reviewer</span>
              <p className="text-muted-foreground">{review?.reviewer}</p>
            </div>
            <div>
              <span className="font-medium text-foreground">Employee ID</span>
              <p className="text-muted-foreground">{review?.employeeid}</p>
            </div>
            <div>
              <span className="font-medium text-foreground">Rating</span>
              <p className="text-muted-foreground">{review?.rating || "0"}/5</p>
            </div>
            <div>
              <span className="font-medium text-foreground">Status</span>
              <Badge
                className={`px-2 py-1 ml-2 text-xs rounded-full ${
                  review?.status === "reviewed"
                    ? "bg-green-100 text-green-700 border border-green-700"
                    : review?.status === "in_progress"
                    ? "bg-yellow-100 text-yellow-700 border border-yellow-500"
                    : review?.status === "pending"
                    ? "bg-blue-100 text-blue-700 border border-blue-500"
                    : "bg-gray-100 text-gray-700 border border-neutral-300"
                }`}
              >
                {review?.status
                  ?.split("_")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </Badge>
            </div>
            <div>
              <span className="font-medium text-foreground">Reviewed At</span>
              <p className="text-muted-foreground">
                {formatDate(review?.reviewed_at)}
              </p>
            </div>
            <div>
              <span className="font-medium text-foreground">Created At</span>
              <p className="text-muted-foreground">
                {formatDate(review?.created_at)}
              </p>
            </div>
          </div>

          <div className="px-6 pt-2 space-y-3 text-sm border-b pb-4">
            <div>
              <span className="font-medium text-foreground">Feedback</span>
              <p className="text-muted-foreground mt-1">
                {review?.feedback || "No feedback given."}
              </p>
            </div>
            <div>
              <span className="font-medium text-foreground">Goals Set</span>
              <div className="mt-1">
                {displayArray(review?.goals_set || [])}
              </div>
            </div>
            <div>
              <span className="font-medium text-foreground">
                Goals Achieved
              </span>
              <div className="mt-1">
                {displayArray(review?.goals_achieved || [])}
              </div>
            </div>
            <div>
              <span className="font-medium text-foreground">
                Areas to Improve
              </span>
              <p className="text-muted-foreground mt-1">
                {review?.areas_to_improve.length == 0
                  ? "None mentioned."
                  : review?.areas_to_improve}
              </p>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default PerformanceReviewDetailed;
