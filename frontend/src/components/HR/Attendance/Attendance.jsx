import React, { useEffect, useState } from "react";
import SummaryCard from "../Homepage/SummaryCard";
import {
  AlarmClock,
  CalendarClock,
  Hourglass,
  UserRoundCheck,
  UserRoundX,
} from "lucide-react";
import AttendaceTable from "./AttendanceTable";
import api from "@/lib/api";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { FilterByName } from "./FilterByName";
import { FilterByDate } from "./FilterByDate";

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("all");

  useEffect(() => {
    async function fetchAttendance() {
      setIsLoading(true);
      let response;
      try {
        response = await api.get("/employees/attendance", {
          withCredentials: true,
        });
        setAttendance(response.data.attendance);
      } catch {
        toast.error(
          error.response?.data?.message || "Failed to fetch attendance"
        );
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAttendance();
    setRefresh(false);
  }, [refresh]);

  useEffect(() => {
    const filtered =
      selectedEmployee === "all"
        ? attendance
        : attendance.filter(
            (item) => item.userid?.toString() === selectedEmployee
          );
    setFilteredAttendance(filtered);
  }, [selectedEmployee, attendance]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="ml-10 mr-10 mt-3 flex flex-col gap-10">
        <div className="flex flex-col gap-3 flex-wrap">
          <h1 className="font-bold text-2xl mb-4">
            Attendance & Leave Overview
          </h1>
          <div className="flex gap-3 flex-wrap">
            <SummaryCard
              to="#"
              logo={UserRoundCheck}
              number="50"
              text="Present Today"
              bgColor="yellow"
            />

            <SummaryCard
              to="#"
              logo={UserRoundX}
              number="5"
              text="Absent Today"
              bgColor="blue"
            />
            <SummaryCard
              to="#"
              logo={CalendarClock}
              number="5"
              text="On Leave"
              bgColor="green"
            />
            <SummaryCard
              to="#"
              logo={AlarmClock}
              number="5"
              text="Late Checkins"
              bgColor="gray"
            />
            <SummaryCard
              to="#"
              logo={Hourglass}
              number="5"
              text="Pending Leaves"
              bgColor="yellow"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between">
            <h1 className="font-bold text-2xl mb-4">Manage Attendance</h1>
            <div className="flex gap-2">
              <FilterByName onChange={setSelectedEmployee} />
              <FilterByName />
              <FilterByDate />
            </div>
          </div>
          <AttendaceTable attendance={filteredAttendance} />
        </div>
      </div>
    </>
  );
};

export default Attendance;
