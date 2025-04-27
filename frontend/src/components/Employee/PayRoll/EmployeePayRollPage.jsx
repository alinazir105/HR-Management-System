import EmployeePayrollTable from "./EmployeePayrollTable";

const EmployeePayrollPage = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">My Payroll</h1>
      <EmployeePayrollTable />
    </div>
  );
};

export default EmployeePayrollPage;
