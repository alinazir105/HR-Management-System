import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LeaveRequestAction } from "./LeaveRequestAction";
import { Badge } from "@/components/ui/badge";

const headings = [
  "Name",
  "Leave Type",
  "Start Date",
  "End Date",
  "Total Days",
  "Reason",
  "Status",
  "My Remarks",
];

const LeaveHistoryTable = ({ leaveRequests, setIsLoading, setRefresh }) => {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-300">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 text-left">
            {headings.map((heading, index) => (
              <TableHead
                key={index}
                className="text-base font-semibold text-gray-800 px-6 py-3 border-b border-gray-200 first:rounded-tl-lg last:rounded-tr-lg transition-all duration-200 hover:bg-gray-100 "
              >
                {heading}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaveRequests.filter((r) => r.status !== "pending").length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={headings.length + 1}
                className="text-center text-red-500 py-4 font-semibold"
              >
                No Leave Requests History!
              </TableCell>
            </TableRow>
          ) : (
            leaveRequests
              .filter((r) => r.status !== "pending")
              .map((row, index) => {
                const start = new Date(row.startdate);
                const end = new Date(row.enddate);
                const timeDiff = end.getTime() - start.getTime();
                const totalDays = Math.floor(timeDiff / (1000 * 3600 * 24)) + 1;

                return (
                  <TableRow
                    key={index}
                    className="text-[1rem] px-4 py-2 hover:bg-transparent"
                  >
                    <TableCell className="px-4 py-2">{row.name}</TableCell>
                    <TableCell className="px-4 py-2">{row.leavetype}</TableCell>
                    <TableCell className="px-4 py-2">{row.startdate}</TableCell>
                    <TableCell className="px-4 py-2">{row.enddate}</TableCell>
                    <TableCell className="px-4 py-2">{totalDays}</TableCell>
                    <TableCell className="px-4 py-2 capitalize">{row.reason}</TableCell>
                    <TableCell className="px-4 py-2">

                      <Badge
                        className={`font-medium px-3 py-1 capitalize rounded-full text-sm
    ${row.status === "rejected"
                            ? "bg-red-100 text-red-800 border border-red-800"
                            : "bg-green-100 text-green-800 border border-green-800"
                          }
  `}
                      >
                        {row.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-2 capitalize">{row.hrremarks}</TableCell>
                  </TableRow>
                );
              })
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeaveHistoryTable;
