import { JobApplicationForm } from "@/components/Jobs/JobApplicationForm";
import JobsHeroSection from "@/components/Jobs/JobsHeroSection";

import React from "react";

const Jobs = () => {
  return (
    <>
      <div className="flex flex-col gap-8 ">
        <div>
          <JobsHeroSection />
        </div>
        <div className="ml-6 mr-6 flex flex-col justify-center gap-4">
          <h1 className="text-2xl font-bold ml-1">Available Jobs</h1>
          <div className="flex gap-6 ">
            <JobApplicationForm />
            <JobApplicationForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Jobs;
