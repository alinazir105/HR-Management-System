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
import DeleteEmployee from "./DeleteEmployee";
import EditEmployeeForm from "./EditEmployeeForm";

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

const EmployeeTable = ({ allEmployees, setIsLoading, setRefresh }) => {
  return (
    <>
      <div className="overflow-hidden rounded-lg border border-gray-300 mt-5">
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
            {allEmployees.map((row, index) => (
              <TableRow
                key={index}
                className={"text-[1rem] px-4 py-2 hover:bg-transparent"}
              >
                {Object.values(row).map((value, i) => (
                  <>
                    {value !== row.userid && (
                      <TableCell key={i} className="px-4 py-2">
                        {value}
                      </TableCell>
                    )}
                  </>
                ))}

                <TableCell className="px-4 py-2 flex">
                  <EditEmployeeForm
                    data={row}
                    setIsLoading={setIsLoading}
                    setRefresh={setRefresh}
                  />
                  <DeleteEmployee
                    userID={row.userid}
                    setIsLoading={setIsLoading}
                    setRefresh={setRefresh}
                  />
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
