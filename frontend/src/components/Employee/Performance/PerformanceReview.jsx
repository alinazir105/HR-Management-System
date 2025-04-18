import React from 'react'
import PerformanceReviewHeader from './PerformanceReviewHeader'
import PerformanceReviewCard from './PerformanceReviewCard'
import PerformanceGraphBlock from './PerformanceGraphBlock'

const PerformanceReview = () => {
    return (
        <div className='content'>
            <PerformanceReviewHeader />
            <div className='flex flex-col xl:flex-row xl:gap-8'>

                <PerformanceReviewCard />
                <PerformanceGraphBlock />
            </div>
        </div>
    )
}

export default PerformanceReview
