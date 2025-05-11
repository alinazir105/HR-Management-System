import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import axios from "axios";
import PayrollFilterPanel from "./PayrollFilterPanel";

export default function PayrollTable() {
  const [payrollData, setPayrollData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("2025-04");

  const [nameFilter, setNameFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [monthFilter, setMonthFilter] = useState("2025-04");
  const [payrollGenerated, setPayrollGenerated] = useState(false);

  const fetchPayroll = () => {
    axios
      .get("http://localhost:3000/api/payroll/employees", {
        params: {
          month: monthFilter,
          name: nameFilter,
          department: departmentFilter !== "all" ? departmentFilter : undefined,
        },
        withCredentials: true,
      })
      .then((res) => {
        setPayrollData(res.data);
        console.log("Payroll Data:", res.data); // Debug log
      })
      .catch((err) => console.error("Error fetching payroll data:", err));
  };

  // useEffect(() => {
  //   fetchPayroll();
  // }, []);

  const handlePayClick = async (employee) => {
    try {
      await axios.post(
        "http://localhost:3000/api/payroll/pay",
        {
          employeeid: employee.employeeid,
          bonus: employee.bonus || 0,
          deductions: employee.deductions || 0,
          month: selectedMonth,
        },
        { withCredentials: true }
      );
      fetchPayroll(); // Refresh data
    } catch (err) {
      console.error("Payment failed", err);
    }
  };

  const getTotalPayroll = () =>
    payrollData.reduce((sum, emp) => sum + Number(emp.netpay || 0), 0).toFixed(2);


  return (
    <div className="p-4">
      <PayrollFilterPanel
        nameFilter={nameFilter}
        departmentFilter={departmentFilter}
        monthFilter={monthFilter}
        onNameChange={setNameFilter}
        onDepartmentChange={setDepartmentFilter}
        onMonthChange={(value) => {
          setMonthFilter(value);
          setSelectedMonth(value);
        }}
        onFilter={fetchPayroll}
      />
      <Button
        disabled={payrollGenerated} // Disable if payroll is already generated
        className="mb-4 bg-blue-600 hover:bg-blue-700 text-white"
        onClick={async () => {
          try {
            await axios.post("http://localhost:3000/api/payroll/generate", {
              month: monthFilter,
            }, { withCredentials: true });
            setPayrollGenerated(true); // <- enable table rendering
            fetchPayroll(); // Load table data after generation
          } catch (err) {
            console.error("Failed to generate payrolls", err);
          }
        }}
      >
        Generate Payrolls
      </Button>


      {payrollGenerated &&
     <Table>
        <TableCaption>Employee Payroll for {monthFilter}</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-50 text-left">
            <TableHead className="text-base font-semibold text-gray-800 px-6 py-3 border-b border-gray-200 first:rounded-tl-lg last:rounded-tr-lg transition-all duration-200 hover:bg-gray-100 ">Employee Name</TableHead>
            <TableHead className="text-base font-semibold text-gray-800 px-6 py-3 border-b border-gray-200 first:rounded-tl-lg last:rounded-tr-lg transition-all duration-200 hover:bg-gray-100 ">Employee ID</TableHead>
            <TableHead className="text-base font-semibold text-gray-800 px-6 py-3 border-b border-gray-200 first:rounded-tl-lg last:rounded-tr-lg transition-all duration-200 hover:bg-gray-100 ">Department</TableHead>
            <TableHead className="text-base font-semibold text-gray-800 px-6 py-3 border-b border-gray-200 first:rounded-tl-lg last:rounded-tr-lg transition-all duration-200 hover:bg-gray-100 ">Base Salary</TableHead>
            <TableHead className="text-base font-semibold text-gray-800 px-6 py-3 border-b border-gray-200 first:rounded-tl-lg last:rounded-tr-lg transition-all duration-200 hover:bg-gray-100 ">Bonus</TableHead>
            <TableHead className="text-base font-semibold text-gray-800 px-6 py-3 border-b border-gray-200 first:rounded-tl-lg last:rounded-tr-lg transition-all duration-200 hover:bg-gray-100 ">Deductions</TableHead>
            <TableHead className="text-base font-semibold text-gray-800 px-6 py-3 border-b border-gray-200 first:rounded-tl-lg last:rounded-tr-lg transition-all duration-200 hover:bg-gray-100 ">Net Pay</TableHead>
            <TableHead className="text-base font-semibold text-gray-800 px-6 py-3 border-b border-gray-200 first:rounded-tl-lg last:rounded-tr-lg transition-all duration-200 hover:bg-gray-100 ">Status</TableHead>
            <TableHead className="text-base font-semibold text-gray-800 px-6 py-3 border-b border-gray-200 first:rounded-tl-lg last:rounded-tr-lg transition-all duration-200 hover:bg-gray-100 ">Actions</TableHead>
          </TableRow>
        </TableHeader>

          <TableBody>
            {payrollData.map((emp) => {
              const status = emp.status?.toLowerCase() || "pending";
              const displayStatus = status === "paid" ? "Paid" : "Pending";

              return (
                <TableRow key={emp.employeeid}>
                  <TableCell>{emp.name}</TableCell>
                  <TableCell>{emp.employeeid}</TableCell>
                  <TableCell>{emp.department}</TableCell>
                  <TableCell>${emp.salary}</TableCell>
                  <TableCell>${emp.bonus || 0}</TableCell>
                  <TableCell>-${emp.deductions || 0}</TableCell>
                  <TableCell>${emp.netpay}</TableCell>
                  <TableCell
                    className={`font-semibold ${status === "paid" ? "text-green-600" : "text-yellow-600"}`}
                  >
                    {displayStatus}
                  </TableCell>
                  <TableCell>
                    {status !== "paid" && (
                      <Button
                        className="bg-green-500 px-6"
                        onClick={() => handlePayClick(emp)}
                      >
                        Pay
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan="6" className="text-right font-bold">
                Total Payroll
              </TableCell>
              <TableCell className="font-bold">${getTotalPayroll()}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      }
    </div>
  );
}
