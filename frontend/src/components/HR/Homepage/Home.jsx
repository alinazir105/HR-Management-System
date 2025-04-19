import React from "react";
import SummaryCard from "./SummaryCard";
import {
  AlarmClock,
  CalendarClock,
  CircleDollarSign,
  DoorOpen,
  Hourglass,
  Mail,
  UserRound,
  UserRoundCheck,
  UserRoundX,
} from "lucide-react";

const Home = () => {
  return (
    <>
      <div className="ml-10 mt-3">
        <div className="flex flex-col gap-3 flex-wrap">
          <h1 className="font-bold text-2xl mb-4">
            Attendance & Leave Overview
          </h1>
          <div className="flex items-center gap-3 flex-wrap">
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
            <SummaryCard
              to="#"
              logo={CircleDollarSign}
              number="7"
              text="Pending Payrolls"
              bgColor="blue"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
