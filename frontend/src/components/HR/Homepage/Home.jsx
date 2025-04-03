import React from "react";
import SummaryCard from "./SummaryCard";
import { CircleDollarSign, DoorOpen, Mail, UserRound } from "lucide-react";

const Home = () => {
  return (
    <>
      <div className="ml-10 mt-3">
        <div className="flex gap-3 flex-wrap">
          <SummaryCard
            to="#"
            logo={Mail}
            number="4"
            text="Messages"
            bgColor="yellow"
          />
          <SummaryCard
            to="#"
            logo={UserRound}
            number="20"
            text="Employees"
            bgColor="blue"
          />
          <SummaryCard
            to="#"
            logo={DoorOpen}
            number="8"
            text="Leaves"
            bgColor="green"
          />
          <SummaryCard
            to="#"
            logo={CircleDollarSign}
            number="7"
            text="Payrolls"
            bgColor="gray"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
