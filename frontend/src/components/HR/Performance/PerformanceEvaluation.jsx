import React, { useEffect, useState } from "react";
import PerformanceEvaluationHeader from "./PerformanceEvaluationHeader";
import PerformanceSummaryCard from "./PerformanceSummaryCard";
import PerformanceEvaluationTable from "./PerformanceEvaluationTable";
import PerformanceReviewAdd from "./PerformanceReviewAdd";
import { toast } from "sonner";
import LoadingScreen from "@/components/ui/LoadingScreen";
import api from "@/lib/api";

const PerformanceEvaluation = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [allPerformanceReviews, setAllPerformanceReviews] = useState([])

  useEffect(() => {
    async function fetchAllPerformanceReviews() {
      try {
        setIsLoading(true);
        const response = await api.get("/performance/all", { withCredentials: true })
        setAllPerformanceReviews(response.data.reviews)
      } catch (e) {
        console.error(e);
        toast.error(e?.response.data.message)
      }
      finally {
        setIsLoading(false)
      }
    }

    fetchAllPerformanceReviews();
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="content">
      <PerformanceEvaluationHeader />
      <PerformanceSummaryCard />
      <div className=" border border-neutral-200 mt-6 pt-4 shadow-md rounded-xl">
        <div className="flex gap-4 justify-between items-center flex-wrap px-5">
          <h2 className="text-xl font-semibold">All Performance Reviews</h2>
          <div>
            <PerformanceReviewAdd allPerformanceReviews={allPerformanceReviews} />
          </div>
        </div>
        <PerformanceEvaluationTable allPerformanceReviews={allPerformanceReviews} />
      </div>
    </div>
  );
};

export default PerformanceEvaluation;
