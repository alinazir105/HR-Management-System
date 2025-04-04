import React from "react";
import EmployeeTable from "./EmployeeTable";

import AddEmployeeForm from "./AddEmployeeForm";

const ManageEmployees = () => {
  return (
    <>
      <div className="ml-10 mr-10 mt-3">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl text-center mb-4">
            Manage Employees
          </h1>
          <AddEmployeeForm />
        </div>
        <EmployeeTable />
      </div>
    </>
  );
};

export default ManageEmployees;
