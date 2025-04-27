import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    TableCaption,
  } from "@/components/ui/table";
  import { useEffect, useState } from "react";
  
  export default function EmployeePayrollTable() {
    const [payrolls, setPayrolls] = useState([]);
  
    useEffect(() => {
      // Fetch employee's own payrolls from API
      // Example: GET /api/employees/:employeeId/payrolls
    }, []);
  
    return (
      <div className="p-4">
        <Table>
          <TableCaption>Your Salary Slips</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Month</TableHead>
              <TableHead>Base Salary</TableHead>
              <TableHead>Bonus</TableHead>
              <TableHead>Deductions</TableHead>
              <TableHead>Net Pay</TableHead>
              <TableHead>Status</TableHead>
              {/* Optional: Download button */}
            </TableRow>
          </TableHeader>
  
          <TableBody>
            {payrolls.map((payroll) => (
              <TableRow key={payroll.id}>
                <TableCell>{new Date(payroll.month).toLocaleString('default', { month: 'long', year: 'numeric' })}</TableCell>
                <TableCell>${payroll.base_salary}</TableCell>
                <TableCell>+${payroll.bonus}</TableCell>
                <TableCell>-${payroll.deductions}</TableCell>
                <TableCell className="font-bold">${payroll.net_pay}</TableCell>
                <TableCell className={payroll.status === "paid" ? "text-green-600" : "text-yellow-600"}>
                  {payroll.status.charAt(0).toUpperCase() + payroll.status.slice(1)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
  