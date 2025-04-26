import React, { useEffect, useState } from "react";
import api from "@/lib/api";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { FilterByName } from "./FilterByName";
import { FilterByDate } from "./FilterByDate";
import { toast } from "sonner";
import AttendanceTable from "./AttendanceTable";
import { DateDropdown } from "./DateDropdown";

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("all");
  const [selectedDateOption, setSelectedDateOption] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");
  console.log("🚀 ~ Attendance ~ selectedDate:", selectedDate);

  useEffect(() => {
    async function fetchAttendance() {
      setIsLoading(true);
      let response;
      try {
        response = await api.get("/attendance/all-employees", {
          withCredentials: true,
        });
        setAttendance(response.data.attendance);
      } catch (e) {
        toast.error("Failed to fetch attendance");
        console.error("Fetch error:", e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAttendance();
    setRefresh(false);
  }, [refresh]);

  useEffect(() => {
    let filtered = [...attendance];

    // Filter by selected employee
    if (selectedEmployee !== "all") {
      filtered = filtered.filter(
        (item) => item.userid?.toString() === selectedEmployee
      );
    }

    // Filter by selected date
    if (selectedDateOption === "specific" && selectedDate) {
      const selectedFormatted = new Date(selectedDate).toLocaleDateString(); // "YYYY-MM-DD"

      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.date).toLocaleDateString();
        return itemDate === selectedFormatted;
      });
    }

    setFilteredAttendance(filtered);
  }, [selectedEmployee, selectedDate, selectedDateOption, attendance]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="content flex flex-col gap-10">
        <div>
          <div className="flex justify-between flex-wrap gap-2">
            <h1 className="font-bold text-2xl">Manage Attendance</h1>
            <div className="flex gap-2 flex-wrap">
              <FilterByName
                setSelectedEmployee={setSelectedEmployee}
                selectedEmployee={selectedEmployee}
              />
              <DateDropdown
                setSelectedDateOption={setSelectedDateOption}
                selectedDateOption={selectedDateOption}
              />
              {/* <FilterByDate
                selectedDateOption={selectedDateOption}
                setSelectedDate={setSelectedDate}
                selectedDate={selectedDate}
              /> */}
            </div>
          </div>
          <AttendanceTable attendance={filteredAttendance} />
        </div>
      </div>
    </>
  );
};

export default Attendance;
