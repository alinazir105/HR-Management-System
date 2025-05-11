import React from "react";
import { Badge } from "@/components/ui/badge";

const AvailableJobsCards = ({ job }) => {
  return (
    <div className="relative border-2 w-full rounded-2xl p-5 bg-white shadow-md transition-transform hover:scale-102 cursor-pointer">
      <div className="flex justify-between flex-wrap">

        <h1 className="text-xl font-bold  mb-2">{job.title}</h1>

        <div className="mb-3">

          <Badge variant="outline" className={"rounded-2xl bg-blue-100 font-semibold text-sx"}>
            {job.location}/ {job.job_type}
          </Badge>
        </div>


      </div>
      <p className="text-sm text-gray-600 mb-3">{job.description}</p>
      <div className="absolute bottom-1 right-2 text-xs">
        <p>
          Deadline:{" "}
          <span className="font-semibold">
            {new Date(job.deadline).toISOString().split("T")[0]}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AvailableJobsCards;
