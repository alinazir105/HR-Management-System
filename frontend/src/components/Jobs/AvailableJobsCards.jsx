import React from "react";
import { Badge } from "@/components/ui/badge";

const AvailableJobsCards = ({ job }) => {
  return (
    <div className="relative border-2 w-full rounded-2xl p-5 bg-white shadow-md transition-transform hover:scale-102 cursor-pointer">
      <div className="absolute top-2 right-2 bg-blue-100 text-xs font-semibold rounded-full ">
        <Badge variant="outline">
          {job.location}/ {job.job_type}
        </Badge>
      </div>

      <h1 className="text-xl font-bold  mb-2">{job.title}</h1>
      <p className="text-sm text-gray-600">{job.description}</p>
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
