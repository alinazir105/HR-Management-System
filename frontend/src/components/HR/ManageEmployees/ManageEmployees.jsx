import React, { useEffect, useState } from "react";
import EmployeeTable from "./EmployeeTable";

import AddEmployeeForm from "./AddEmployeeForm";
import api from "@/lib/api";
import { toast } from "sonner";

const ManageEmployees = () => {
  const [allEmployees, setAllEmployees] = useState([]);
  useEffect(() => {
    async function fetchAllEmployees() {
      let response;
      try {
        response = await api.get("/employees/all", { withCredentials: true });
        setAllEmployees(response.data.employees);
      } catch {
        toast.error(response.data.message);
      }
    }
    fetchAllEmployees();
  }, []);

  return (
    <>
      <div className="ml-10 mr-10 mt-3">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl text-center mb-4">
            Manage Employees
          </h1>
          <AddEmployeeForm />
        </div>
        <EmployeeTable allEmployees={allEmployees} />
      </div>
    </>
  );
};

export default ManageEmployees;
