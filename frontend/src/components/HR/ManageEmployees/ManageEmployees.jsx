import React, { useEffect, useState } from "react";
import EmployeeTable from "./EmployeeTable";

import AddEmployeeForm from "./AddEmployeeForm";
import api from "@/lib/api";
import { toast } from "sonner";
import LoadingScreen from "@/components/ui/LoadingScreen";

const ManageEmployees = () => {
  const [allEmployees, setAllEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function fetchAllEmployees() {
      setIsLoading(true);
      let response;
      try {
        response = await api.get("/employees/all", { withCredentials: true });
        setAllEmployees(response.data.employees);
      } catch {
        toast.error(response.data.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAllEmployees();
    setRefresh(false);
  }, [refresh]);
  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <>
      <div className="ml-10 mr-10 mt-3">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl text-center mb-4">
            Manage Employees
          </h1>
          <AddEmployeeForm
            setIsLoading={setIsLoading}
            setRefresh={setRefresh}
          />
        </div>
        <EmployeeTable
          allEmployees={allEmployees}
          setIsLoading={setIsLoading}
          setRefresh={setRefresh}
        />
      </div>
    </>
  );
};

export default ManageEmployees;
