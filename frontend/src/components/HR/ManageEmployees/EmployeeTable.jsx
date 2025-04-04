import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const headings = [
  "Name",
  "Email",
  "Dept.",
  "Job Title",
  "Start Date",
  "Category",
  "Salary",
  "Gender",
  "Actions",
];
const rows = [
  {
    Name: "Amal Khalili",
    Email: "amal@gmail.com",
    Dept: "IT.",
    JobTitle: "Backend Engineer",
    Startdate: "29/04/2022",
    Category: "Fulltime",
    Salary: "$2300",
    Gender: "Female",
  },
];
const EmployeeTable = () => {
  return (
    <>
      <div className="overflow-hidden rounded-lg border border-gray-300 ">
        <Table>
          <TableHeader>
            <TableRow className={" hover:bg-tranparent"}>
              {headings.map((heading, index) => (
                <TableHead
                  key={index}
                  className={"text-lg font-semibold px-4 py-2 bg-gray-300"}
                >
                  {heading}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                className={"text-[1rem] px-4 py-2 hover:bg-transparent"}
              >
                {Object.values(row).map((value, i) => (
                  <TableCell key={i} className="px-4 py-2">
                    {value}
                  </TableCell>
                ))}

                <TableCell className="px-4 py-2">
                  <Button variant="outline" className={"mr-2 cursor-pointer"}>
                    {" "}
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    className={"hover:bg-red-700 cursor-pointer"}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default EmployeeTable;
