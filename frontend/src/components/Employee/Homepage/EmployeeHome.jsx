import React, { useEffect, useState } from "react";

import PerformanceReviewCard from "../Performance/PerformanceReviewCard";

import HomeSummaryCards from "./HomeSummaryCards";
import TodaysStats from "./TodaysStats";
import AddEmployeeForm from "@/components/HR/ManageEmployees/AddEmployeeForm";
import AnnouncementsDialog from "@/components/shared/Announcements/AnnouncementsDialog";
import RecruitmentJobAdd from "@/components/HR/Recruitment/RecruitmentJobAdd";
import LeaveRequestDialog from "./../LeaveRequests/LeaveRequestDialog";
import { toast } from "sonner";
import api from "@/lib/api";
import LoadingScreen from "@/components/ui/LoadingScreen";

const EmployeeHome = () => {
  const [dashboardData, setDashboardData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchDashboardData() {
      setIsLoading(true)
      try {
        const response = await api.get("/employees/home/me", { withCredentials: true });
        setDashboardData(response.data.home);
      } catch (e) {
        console.error(e);
        toast.error("Something went wrong! Please try again later")
      }
      finally {
        setIsLoading(false)
      }
    }
    fetchDashboardData()

  }, [])


  if (isLoading) {
    return <LoadingScreen />
  }


  return (
    <>
      <div className="flex flex-col gap-4 px-4 md:px-10 mb-5">
        <h1 className="text-3xl font-bold">My Dashboard</h1>
        <TodaysStats attendance={dashboardData.checkInStatus} />
        <div className="flex flex-col mt-3">
          <h1 className="text-2xl font-bold mb-6">Overall Stats</h1>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            <HomeSummaryCards
              type="performance"
              title="Overall Rating"
              text={dashboardData.overallRating + " " + (dashboardData.overallRating > 4 ? "★★★★★" : dashboardData.overallRating > 3 ? "★★★★" : dashboardData.overallRating > 2 ? "★★★" : dashboardData.overallRating > 1 ? "★★" : "★")}
              tooltip="Average of recent performance reviews"
            />
            <HomeSummaryCards
              type="leavesReaming"
              title="Leave Remaining"
              text={dashboardData.remainingLeaves.sick_leave_remaining + " / " + dashboardData.remainingLeaves.annual_leave_remaining + " / " + dashboardData.remainingLeaves.casual_leave_remaining + " / " + dashboardData.remainingLeaves.parental_leave_remaining}
              tooltip={
                `Sick Leaves: ${dashboardData.remainingLeaves.sick_leave_remaining}\n` +
                `Annual Leaves: ${dashboardData.remainingLeaves.annual_leave_remaining}\n` +
                `Casual Leaves: ${dashboardData.remainingLeaves.casual_leave_remaining}\n` +
                `Parental Leaves: ${dashboardData.remainingLeaves.parental_leave_remaining}`
              }
            />
            {/* <HomeSummaryCards
              type="payroll"
              title="Upcoming Payroll"
              text="25th January"
              tooltip="Your salary will be processed on 25th Jan"
            /> */}
            <HomeSummaryCards
              type="attendance"
              title="Attendance Percentage"
              text={dashboardData.attendancePercentage + "%"}
              tooltip={"You've maintained a " + dashboardData.attendancePercentage + "% attendance rate"}
            />
            <HomeSummaryCards
              type="leave"
              title="Pending Leave Requests"
              text={dashboardData.pendingLeaveRequests}
              tooltip={"You have " + dashboardData.pendingLeaveRequests + " unapproved leave requests"}
            />
          </div>
        </div>
        <div className="mt-6">
          <h1 className="text-2xl font-bold mb-6">Quick Actions</h1>
          <div className="flex gap-4 flex-wrap">
            <LeaveRequestDialog setRefresh={() => { }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeHome;
