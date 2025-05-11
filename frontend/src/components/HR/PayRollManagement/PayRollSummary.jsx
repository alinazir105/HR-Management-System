import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Users, Wallet, CheckCircle, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
const PayrollSummary = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000/api/payroll/summary", { withCredentials: true })
      .then((res) => setSummary(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!summary) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {/* Same Cards, but with dynamic values from summary */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Total Employees</CardTitle>
          <Users className="h-6 w-6 text-muted-foreground" />
        </CardHeader>
        <CardContent className="text-2xl font-bold">{summary.totalEmployees}</CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Total Amount</CardTitle>
          <Wallet className="h-6 w-6 text-muted-foreground" />
        </CardHeader>
        <CardContent className="text-2xl font-bold">${summary.totalAmount}</CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Paid</CardTitle>
          <CheckCircle className="h-6 w-6 text-green-500" />
        </CardHeader>
        <CardContent className="text-2xl font-bold">${summary.paid}</CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Unpaid</CardTitle>
          <AlertCircle className="h-6 w-6 text-red-500" />
        </CardHeader>
        <CardContent className="text-2xl font-bold">${summary.unpaid}</CardContent>
      </Card>
    </div>
  );
};

export default PayrollSummary;
