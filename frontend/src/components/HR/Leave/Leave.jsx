import React from "react";
import { LeaveOptionsTab } from "./LeaveOptionsTab";

const Leave = () => {
  return (
    <>
      <div className="ml-10 mr-10 mt-3">
        <h1 className="font-bold text-2xl mb-4">Leave Management</h1>
        <LeaveOptionsTab />
      </div>
    </>
  );
};

export default Leave;
