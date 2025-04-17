import React from "react";
import SummaryCard from "../Homepage/SummaryCard";
import {
  AlarmClock,
  CalendarClock,
  Hourglass,
  UserRoundCheck,
  UserRoundX,
} from "lucide-react";

const Attendance_Leave = () => {
  return (
    <>
      <div className=" mt-3">
        <div className="flex flex-col gap-3 flex-wrap">
          <h1 className="font-bold text-2xl text-center mb-4">
            Attendance & Leave Overview
          </h1>
          <div className="flex gap-3 flex-wrap items-center justify-center">
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
          <h1 className="font-bold text-2xl text-center mb-4">
            Manage Attendance
          </h1>
        </div>
      </div>
    </>
  );
};

export default Attendance_Leave;
