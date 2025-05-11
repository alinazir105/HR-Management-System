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

const headings = [
  "Name",
  "Leave Type",
  "Start Date",
  "End Date",
  "Reason",
  "Total Days",
  "Actions",
];

const PendingRequestsTable = ({ leaveRequests, setIsLoading, setRefresh }) => {
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
          {leaveRequests.filter((r) => r.status === "pending").length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={headings.length + 1}
                className="text-center text-red-500 py-4 font-semibold"
              >
                No Pending Leave Requests!
              </TableCell>
            </TableRow>
          ) : (
            leaveRequests
              .filter((r) => r.status === "pending")
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
                    {Object.values(row).map((value, i) => (
                      <>
                        {value !== row.employeeid &&
                          value !== row.status &&
                          value !== row.hrremarks && (
                            <TableCell key={i} className="px-4 py-2 capitalize">
                              {value}
                            </TableCell>
                          )}
                      </>
                    ))}
                    <TableCell className="px-4 py-2">{totalDays}</TableCell>
                    <TableCell className={"flex gap-2"}>
                      <LeaveRequestAction
                        status={"Approve"}
                        employeeid={row.employeeid}
                        type={row.leavetype}
                        days={totalDays}
                        setIsLoading={setIsLoading}
                        setRefresh={setRefresh}
                      />
                      <LeaveRequestAction
                        status={"Reject"}
                        employeeid={row.employeeid}
                        type={""}
                        days={""}
                        setIsLoading={setIsLoading}
                        setRefresh={setRefresh}
                      />
                    </TableCell>
                  </TableRow>
                );
              })
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PendingRequestsTable;
