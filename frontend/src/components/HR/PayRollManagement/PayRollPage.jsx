import PayrollSummary from "./PayrollSummary";
import PayrollTable from "./PayrollTable";
import NotificationToast from "./NotificationToast";

const PayrollPage = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Payroll Management</h1>
      <PayrollSummary />
      <PayrollTable />
    </div>
  );
};

export default PayrollPage;
