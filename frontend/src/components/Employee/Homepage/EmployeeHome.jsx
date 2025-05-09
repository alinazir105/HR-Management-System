import React from "react";

import PerformanceReviewCard from "../Performance/PerformanceReviewCard";
import api from "@/lib/api";
import { toast } from "sonner";

import HomeSummaryCards from "./HomeSummaryCards";
import TodaysStats from "./TodaysStats";
import AddEmployeeForm from "@/components/HR/ManageEmployees/AddEmployeeForm";
import AnnouncementsDialog from "@/components/shared/Announcements/AnnouncementsDialog";
import RecruitmentJobAdd from "@/components/HR/Recruitment/RecruitmentJobAdd";
import LeaveRequestDialog from "./../LeaveRequests/LeaveRequestDialog";

const EmployeeHome = () => {
  return (
    <>
      <div className="flex flex-col gap-4 px-4 md:px-10 mb-5">
        <h1 className="text-3xl font-bold">My Dashboard</h1>
        <TodaysStats />
        <div className="flex flex-col mt-3">
          <h1 className="text-2xl font-bold mb-6">Overall Stats</h1>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            <HomeSummaryCards
              type="performance"
              title="Overall Rating"
              text="4.2 ★★★★★"
              tooltip="Average of recent performance reviews"
            />
            <HomeSummaryCards
              type="leavesReaming"
              title="Leave Remaining"
              text="10 / 8 / 20 / 30"
              tooltip="Sick Leaves: 10\nAnnual Leaves: 8\nCasual Leaves: 20\nParental Leaves: 30"
            />
            <HomeSummaryCards
              type="payroll"
              title="Upcoming Payroll"
              text="25th January"
              tooltip="Your salary will be processed on 25th Jan"
            />
            <HomeSummaryCards
              type="attendance"
              title="Attendance Percentage"
              text="90%"
              tooltip="Great! You've maintained a 90% attendance rate"
            />
            <HomeSummaryCards
              type="leave"
              title="Pending Leave Requests"
              text="2"
              tooltip="You have 2 unapproved leave requests"
            />
          </div>
        </div>
        <div className="mt-6">
          <h1 className="text-2xl font-bold mb-6">Quick Actions</h1>
          <div className="flex gap-4 flex-wrap">
            <LeaveRequestDialog setRefresh={() => {}} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeHome;
