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
import { Badge } from "@/components/ui/badge";

const headings = ["Name", "Date", "Checkin", "Checkout", "Workhours", "Status"];

const formatTime = (timeString) => {
  const [hours, minutes, _] = timeString.split(':');

  let hour = parseInt(hours, 10);
  const minute = parseInt(minutes, 10);

  const period = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12;
  hour = hour ? hour : 12;


  return `${hour}:${String(minute).padStart(2, '0')} ${period}`;
};

const AttendanceTable = ({ attendance }) => {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-300 mt-5">
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
                    {value !== row.userid && (
                      <>
                        {value == row.checkin || value == row.checkout ? <TableCell key={i} className="px-4 py-2">
                          {value ? formatTime(value) : "-"}
                        </TableCell> : value == row.status ? <TableCell key={i} className="px-4 py-2">
                          <Badge
                            className={`font-medium px-3 py-1 rounded-full text-sm
    ${row.status === "Absent"
                                ? "bg-red-100 text-red-800 border border-red-800"
                                : "bg-green-100 text-green-800 border border-green-800"
                              }
  `}
                          >
                            {value}
                          </Badge>
                        </TableCell> : <TableCell key={i} className="px-4 py-2">
                          {value}
                        </TableCell>}

                      </>
                    )}
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

export default AttendanceTable;
