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

const reviews = [
    {
        id: 1,
        employeeid: "EMP123",
        name: "Sara Khan",
        period: "Q1 2025",
        reviewer: "HR Manager",
        rating: 4.2,
        status: "Completed",
        reviewed_at: "2025-04-01",
    },


];

const headings = [
    "Employee ID",
    "Employee Name",
    "Period",
    "Reviewer",
    "Rating",
    "Reviewed At",
    "Status",
    "Actions"
];

const PerformanceEvaluationTable = () => {
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
                    {reviews.map((review) => (
                        <TableRow key={review.id}>
                            <TableCell className={"px-5"}>{review.employeeid}</TableCell>
                            <TableCell className={"px-5"}>{review.name}</TableCell>
                            <TableCell className={"px-5"}>{review.period}</TableCell>
                            <TableCell className={"px-5"}>{review.reviewer}</TableCell>
                            <TableCell className={"px-5"}>{review.rating}</TableCell>
                            <TableCell className={"px-5"}>{review.reviewed_at || "—"}</TableCell>
                            <TableCell className={"px-5"}>
                                <Badge >{review.status}</Badge>
                            </TableCell>
                            <TableCell className="flex gap-2 px-5">
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="hover:bg-muted"
                                    onClick={() => console.log("View", review.id)}
                                >
                                    <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="hover:bg-muted"
                                    onClick={() => console.log("Edit", review.id)}
                                >
                                    <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                    size="icon"
                                    variant="destructive"
                                    onClick={() => console.log("Delete", review.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default PerformanceEvaluationTable;

