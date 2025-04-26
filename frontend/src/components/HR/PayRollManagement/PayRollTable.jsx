import {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
    TableCaption,
  } from "@/components/ui/table"; // adjust the path if needed
  import { Button } from "@/components/ui/button";
  import {useState, useEffect} from "react";
  export default function PayrollTable() {
    const[payrollData, setPayrollData] = useState([]);

    useEffect(()=>{
        //fetch payroll data from API
        
    },[])
    const handlePayClick=()=>{
        // Handle the pay action here
        console.log("Pay button clicked");
    }
    
    return (
      <div className="p-4">
        <Table>
          <TableCaption>Employee Payroll for April 2025</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Employee Name</TableHead>
              <TableHead>Employee ID</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Base Salary</TableHead>
              <TableHead>Bonus</TableHead>
              <TableHead>Deductions</TableHead>
              <TableHead>Net Pay</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
  
          <TableBody>
            <TableRow>
              <TableCell>John Doe</TableCell>
              <TableCell>EMP123</TableCell>
              <TableCell>Engineering</TableCell>
              <TableCell>$5,000</TableCell>
              <TableCell>$500</TableCell>
              <TableCell>-$100</TableCell>
              <TableCell>$5,400</TableCell>
              <TableCell className="text-green-600 font-semibold">Paid</TableCell>
            </TableRow>
  
            <TableRow>
              <TableCell>Jane Smith</TableCell>
              <TableCell>EMP456</TableCell>
              <TableCell>Marketing</TableCell>
              <TableCell>$4,000</TableCell>
              <TableCell>$400</TableCell>
              <TableCell>-$50</TableCell>
              <TableCell>$4,350</TableCell>
              <TableCell className="text-yellow-600 font-semibold">Pending</TableCell>
              <TableCell>
                <Button className="bg-green-500 px-6" onClick={handlePayClick}>Pay</Button>
              </TableCell>
            </TableRow>
          </TableBody>
  
          <TableFooter>
            <TableRow>
              <TableCell colSpan="6" className="text-right font-bold">
                Total Payroll
              </TableCell>
              <TableCell className="font-bold">$9,750</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    );
  }
  