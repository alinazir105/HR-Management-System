import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Users, Wallet, CheckCircle, AlertCircle } from "lucide-react";

const PayrollSummary = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Total Employees</CardTitle>
          <Users className="h-6 w-6 text-muted-foreground" />
        </CardHeader>
        <CardContent className="text-2xl font-bold">50</CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Total Amount</CardTitle>
          <Wallet className="h-6 w-6 text-muted-foreground" />
        </CardHeader>
        <CardContent className="text-2xl font-bold">$75,000</CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Paid</CardTitle>
          <CheckCircle className="h-6 w-6 text-green-500" />
        </CardHeader>
        <CardContent className="text-2xl font-bold">$60,000</CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Unpaid</CardTitle>
          <AlertCircle className="h-6 w-6 text-red-500" />
        </CardHeader>
        <CardContent className="text-2xl font-bold">$15,000</CardContent>
      </Card>
    </div>
  );
};

export default PayrollSummary;
