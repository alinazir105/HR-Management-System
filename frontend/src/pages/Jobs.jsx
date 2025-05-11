import { JobApplicationForm } from "@/components/Jobs/JobApplicationForm";
import JobsHeroSection from "@/components/Jobs/JobsHeroSection";
import LoadingScreen from "@/components/ui/LoadingScreen";
import api from "@/lib/api";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Jobs = () => {
  const [allJobs, setAllJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function fetchAllJobs() {
      setIsLoading(true);
      let response;
      try {
        response = await api.get("/recruitment/all-jobs", {
          withCredentials: true,
        });
        setAllJobs(response.data.allJobs);
      } catch {
        toast.error(response.data.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAllJobs();
    setRefresh(false);
  }, [refresh]);
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="flex flex-col gap-8 ">
        <div>
          <JobsHeroSection />
        </div>
        <div className="ml-6 mr-6 flex flex-col justify-center gap-4">
          <h1 className="text-2xl font-bold ml-1">Available Jobs</h1>
          <div className="flex gap-6">
            {allJobs.filter((job) => job.openings > 0).length > 0 ? (
              allJobs
                .filter((job) => job.openings > 0)
                .map((job) => (
                  <JobApplicationForm
                    key={job._id}
                    job={job}
                    setIsLoading={setIsLoading}
                    setRefresh={setRefresh}
                  />
                ))
            ) : (
              <h2 className="text-xl text-red-500 text-center w-full font-semibold ml-1">
                No Jobs!
              </h2>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Jobs;
