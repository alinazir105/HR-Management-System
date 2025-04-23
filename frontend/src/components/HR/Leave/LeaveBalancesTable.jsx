import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LeaveBalanceProgress } from "./LeaveBalanceProgress";

const headings = [
  "Name",
  "Sick Leaves",
  "Annual Leaves",
  "Casual Leaves",
  "Parental Leaves",
];

const LeaveBalancesTable = ({ leaveBalances, setIsLoading, setRefresh }) => {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-300">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            {headings.map((heading, index) => (
              <TableHead
                key={index}
                className="text-lg font-semibold px-4 py-2 bg-gray-300"
              >
                {heading}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaveBalances.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={headings.length + 1}
                className="text-center text-red-500 py-4 font-semibold"
              >
                No Leave Balances!
              </TableCell>
            </TableRow>
          ) : (
            leaveBalances.map((row, index) => (
              <TableRow
                key={index}
                className="text-[1rem] px-4 py-2 hover:bg-transparent"
              >
                <TableCell className="px-4 py-2 font-medium">
                  {row.name}
                </TableCell>

                {/* Sick Leaves */}
                <TableCell className="px-4 py-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span>{row.sick_leave_used}</span>
                    <LeaveBalanceProgress
                      used={row.sick_leave_used}
                      total={row.sick_leave_total}
                    />
                    <span>
                      <span className="font-semibold">
                        {Number(row.sick_leave_total) -
                          Number(row.sick_leave_used)}
                      </span>{" "}
                      left
                    </span>
                  </div>
                </TableCell>

                {/* Annual Leaves */}
                <TableCell className="px-4 py-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span>{row.annual_leave_used}</span>
                    <LeaveBalanceProgress
                      used={row.annual_leave_used}
                      total={row.annual_leave_total}
                    />
                    <span>
                      <span className="font-semibold">
                        {Number(row.annual_leave_total) -
                          Number(row.annual_leave_used)}
                      </span>{" "}
                      left
                    </span>
                  </div>
                </TableCell>

                {/* Casual Leaves */}
                <TableCell className="px-4 py-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span>{row.casual_leave_used}</span>
                    <LeaveBalanceProgress
                      used={row.casual_leave_used}
                      total={row.casual_leave_total}
                    />
                    <span>
                      <span className="font-semibold">
                        {Number(row.casual_leave_total) -
                          Number(row.casual_leave_used)}
                      </span>{" "}
                      left
                    </span>
                  </div>
                </TableCell>

                {/* Parental Leaves */}
                <TableCell className="px-4 py-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span>{row.parental_leave_used}</span>
                    <LeaveBalanceProgress
                      used={row.parental_leave_used}
                      total={row.parental_leave_total}
                    />
                    <span>
                      <span className="font-semibold">
                        {Number(row.parental_leave_total) -
                          Number(row.parental_leave_used)}
                      </span>{" "}
                      left
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeaveBalancesTable;
