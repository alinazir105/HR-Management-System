import React from "react";
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
import { QuickActionButton } from "./QuickActionButton";

const Home = () => {
  return (
    <>
      <div className="content flex flex-col gap-5">
        <div className="flex flex-col gap-3 flex-wrap">
          <h1 className="font-bold text-2xl mb-4">Overview</h1>
          <div className="flex flex-col xl:flex-row justify-center items-center gap-12">
            <div className="flex flex-col w-full xl:w-auto justify-center items-center gap-1">
              <div className="flex items-center justify-between w-full">
                <h3 className="font-bold text-md">Average Perfomance Chart</h3>
                <a
                  href="#"
                  className="p-2 text-black underline font-semibold hover:text-blue-500"
                >
                  See More
                </a>
              </div>
              <AvgPerformanceChart />
            </div>
            <div className="grid grid-cols-4 xl:grid-cols-2 2xl:grid-cols-3 overflow-hidden gap-5">
              <SummaryCard
                to="#"
                logo={UserRoundCheck}
                number="50"
                text="Checkins Today"
              />
              <SummaryCard
                to="#"
                logo={UserRoundX}
                number="5"
                text="No Checkins Today"
              />

              <SummaryCard
                to="#"
                logo={Hourglass}
                number="5"
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
                number="7"
                text="Job Applications"
              />
              <SummaryCard
                to="#"
                logo={Star}
                number="7"
                text="Pending Performance"
              />
            </div>
          </div>
        </div>
        <div className="mr-10">
          <h1 className="font-bold text-2xl mb-4">Quick Actions</h1>
          <div className="flex gap-4 flex-wrap">
            <QuickActionButton logo={Plus} text={"Add Employee"} />
            <QuickActionButton logo={Megaphone} text={"Add Announcement"} />
            <QuickActionButton logo={Star} text={"Add Performance Review"} />
            <QuickActionButton logo={FilePen} text={"Add Job"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
