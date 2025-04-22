import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import PerformanceReviewDelete from "./PerformanceReviewDelete";
import PerformanceReviewDetailed from "./PerformanceReviewDetailed";

const headings = [
  "Employee ID",
  "Employee Name",
  "Period",
  "Reviewer",
  "Rating",
  "Reviewed At",
  "Status",
  "Actions",
];

const PerformanceEvaluationTable = ({ allPerformanceReviews, setRefreshData }) => {
  return (
    <div className="rounded-xl border shadow-sm mt-3">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 text-left">
            {headings.map((heading, index) => (
              <TableHead
                key={index}
                className="text-base font-semibold text-gray-800 px-5 py-2 border-b border-gray-200 first:rounded-tl-lg last:rounded-tr-lg transition-all duration-200 hover:bg-gray-100 "
              >
                {heading}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {allPerformanceReviews.length == 0 || allPerformanceReviews.every((rev) => !rev.id) ? <TableRow><TableCell colSpan={8} className="px-4 py-4 text-center font-semibold text-red-700 text-lg">No Reviews Found</TableCell></TableRow> : allPerformanceReviews.map((review) => (
            <>
              {review.id && <TableRow key={review.id}>
                <TableCell className={"px-5"}>{review.employeeid}</TableCell>
                <TableCell className={"px-5"}>{review.name}</TableCell>
                <TableCell className={"px-5"}>{review.period}</TableCell>
                <TableCell className={"px-5"}>{review.reviewer}</TableCell>
                <TableCell className={"px-5"}>{review.rating || "-"}</TableCell>
                <TableCell className={"px-5"}>
                  {review.reviewed_at ? new Date(review.reviewed_at).toLocaleDateString() : "-"}
                </TableCell>
                <TableCell className={"px-5"}>
                  <Badge className="capitalize">
                    {review?.status
                      ?.split("_")
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(" ")}
                  </Badge>
                </TableCell>
                <TableCell className="flex gap-2 px-5">
                  <PerformanceReviewDetailed review={review} />
                  <Button
                    size="icon"
                    variant="outline"
                    className="hover:bg-muted"
                    onClick={() => console.log("Edit", review.id)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <PerformanceReviewDelete id={review.id} setRefreshData={setRefreshData} />
                </TableCell>
              </TableRow>}
            </>

          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PerformanceEvaluationTable;
