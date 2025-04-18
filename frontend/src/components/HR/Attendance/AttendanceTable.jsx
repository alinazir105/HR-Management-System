import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const headings = ["Name", "Date", "Checkin", "Checkout", "Status", "Workhours"];

const AttendaceTable = ({ attendance }) => {
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
          {attendance.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={headings.length + 1}
                className="text-center text-red-500 py-4 font-semibold"
              >
                No attendance!
              </TableCell>
            </TableRow>
          ) : (
            attendance.map((row, index) => (
              <TableRow
                key={index}
                className="text-[1rem] px-4 py-2 hover:bg-transparent"
              >
                {Object.values(row).map((value, i) => (
                  <>
                    {value !== row.userid && <TableCell key={i} className="px-4 py-2">
                      {value}
                    </TableCell>}
                  </>

                ))}

              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AttendaceTable;
