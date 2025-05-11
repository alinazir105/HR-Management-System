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
import axios from "axios";
export default function EmployeePayrollTable() {
  const [payrolls, setPayrolls] = useState([]);

  useEffect(() => {
    const fetchPayrolls = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/payroll/employee/payrolls", {
          withCredentials: true,
        });

        setPayrolls(res.data);
      } catch (err) {
        console.error("Failed to fetch payrolls:", err);
      }
    };
  
    fetchPayrolls();
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
          </TableRow>
        </TableHeader>

        <TableBody>
          {payrolls.map((payroll, idx) => (
            <TableRow key={idx}>
              <TableCell>
                {new Date(payroll.month).toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell>${payroll.base_salary}</TableCell>
              <TableCell>+${payroll.bonus}</TableCell>
              <TableCell>-${payroll.deductions}</TableCell>
              <TableCell className="font-bold">${payroll.net_pay}</TableCell>
              <TableCell
                className={
                  payroll.status === "paid"
                    ? "text-green-600"
                    : "text-yellow-600"
                }
              >
                {payroll.status.charAt(0).toUpperCase() + payroll.status.slice(1)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
