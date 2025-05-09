import React, { useEffect, useState } from "react";
import SummaryCard from "./SummaryCard";
import {
  CircleDollarSign,
  ClipboardPen,
  FilePen,
  Hourglass,
  Megaphone,
  Plus,
  Star,
  UserRoundCheck,
  UserRoundX,
} from "lucide-react";
import { AvgPerformanceChart } from "./AvgPerformanceChart";
import api from "@/lib/api";
import { toast } from "sonner";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { Link } from "react-router-dom";
import AddEmployeeForm from "../ManageEmployees/AddEmployeeForm";
import AnnouncementsDialog from "@/components/shared/Announcements/AnnouncementsDialog";
import RecruitmentJobAdd from "../Recruitment/RecruitmentJobAdd";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [summaryData, setSummaryData] = useState(null);

  useEffect(() => {
    const fetchSummaryData = async () => {
      setIsLoading(true);
      try {
        const response = await api.get("/hrDashboard/summary", {
          withCredentials: true,
        });
        setSummaryData(response.data);
      } catch (error) {
        toast.error("Failed to fetch dashboard summary");
        console.error("Failed to fetch dashboard summary", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSummaryData();
    setRefresh(false);
  }, [refresh]);

  if (isLoading || !summaryData) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="content flex flex-col gap-5">
        <div className="flex flex-col gap-3 flex-wrap">
          <h1 className="font-bold text-2xl mb-4">Overview</h1>
          <div className="flex flex-col xl:flex-row justify-center items-center gap-12">
            <div className="flex flex-col w-full xl:w-auto justify-center items-center gap-1">
              <div className="flex items-center justify-between w-full">
                <h3 className="font-bold text-md">Average Perfomance Chart</h3>

                <Link
                  className="p-2 text-black underline font-semibold hover:text-blue-500"
                  to="/hr/dashboard/performance"
                >
                  See More
                </Link>
              </div>
              <AvgPerformanceChart />
            </div>
            <div className="grid grid-cols-4 xl:grid-cols-2 2xl:grid-cols-3 overflow-hidden gap-5">
              <SummaryCard
                to="#"
                logo={UserRoundCheck}
                number={summaryData.attendance.checkins}
                text="Checkins Today"
              />
              <SummaryCard
                to="#"
                logo={UserRoundX}
                number={summaryData.attendance.noCheckins}
                text="No Checkins Today"
              />

              <SummaryCard
                to="#"
                logo={Hourglass}
                number={summaryData.pendingLeaves}
                text="Pending Leaves"
              />
              <SummaryCard
                to="#"
                logo={CircleDollarSign}
                number="7"
                text="Pending Payrolls"
              />
              <SummaryCard
                to="#"
                logo={ClipboardPen}
                number={summaryData.jobApplications}
                text="Job Applications"
              />
              <SummaryCard
                to="#"
                logo={Star}
                number={summaryData.pendingReviews}
                text="Pending Performance"
              />
            </div>
          </div>
        </div>
        <div className="mr-10">
          <h1 className="font-bold text-2xl mb-4">Quick Actions</h1>
          <div className="flex gap-4 flex-wrap">
            <AddEmployeeForm setIsLoading={() => {}} setRefresh={() => {}} />
            <AnnouncementsDialog
              setRefreshData={() => {}}
              setIsAdding={() => {}}
            />
            <RecruitmentJobAdd setRefresh={() => {}} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
