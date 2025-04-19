import React, { useEffect, useState } from 'react'
import PerformanceReviewHeader from './PerformanceReviewHeader'
import PerformanceReviewCard from './PerformanceReviewCard'
import PerformanceGraphBlock from './PerformanceGraphBlock'
import PerformanceDetails from './PerformanceDetails'
import { toast } from 'sonner'
import api from '@/lib/api'
import LoadingScreen from '@/components/ui/LoadingScreen'

const PerformanceReview = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [performanceReviews, setPerformanceReviews] = useState([])
    console.log("🚀 ~ PerformanceReview ~ performanceReviews:", performanceReviews)

    useEffect(() => {
        async function fetchEmployeeReviews() {
            let response;
            setIsLoading(true)
            try {
                response = await api.get("/performance/me", { withCredentials: true });
                if (response.data.reviews.length == 0) {
                    toast.error("No reviews found!")
                }
                else {
                    setPerformanceReviews(response.data.reviews);
                }
            } catch (e) {
                console.error(e);
                toast.error(response.data.message)
            }
            finally {
                setIsLoading(false)
            }
        }
        fetchEmployeeReviews()

    }, [])

    if (isLoading) {
        return <LoadingScreen />
    }

    return (
        <div className='content'>
            <PerformanceReviewHeader />
            <div className='flex flex-col xl:flex-row xl:gap-8'>
                <PerformanceReviewCard performanceReviews={performanceReviews} />
                <PerformanceGraphBlock performanceReviews={performanceReviews} />
            </div>
            <PerformanceDetails performanceReviews={performanceReviews} />
        </div>
    )
}

export default PerformanceReview
