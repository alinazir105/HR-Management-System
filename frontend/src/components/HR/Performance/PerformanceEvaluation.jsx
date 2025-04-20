import React from 'react'
import PerformanceEvaluationHeader from './PerformanceEvaluationHeader'
import PerformanceSummaryCard from './PerformanceSummaryCard'
import PerformanceEvaluationTable from './PerformanceEvaluationTable'
import PerformanceReviewAdd from './PerformanceReviewAdd'

const PerformanceEvaluation = () => {

    return (
        <div className='content'>
            <PerformanceEvaluationHeader />
            <PerformanceSummaryCard />
            <div className=' border border-neutral-200 mt-6 pt-4 shadow-md rounded-xl'>

                <div className='flex gap-4 justify-between items-center flex-wrap px-5'>
                    <h2 className='text-xl font-semibold'>All Performance Reviews</h2>
                    <div>
                        <PerformanceReviewAdd />
                    </div>
                </div>
                <PerformanceEvaluationTable />
            </div>
        </div>
    )
}

export default PerformanceEvaluation
