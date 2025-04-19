import { Star } from 'lucide-react';
import React from 'react';

const PerformanceReviewCard = ({ performanceReviews }) => {


    const calculateAverageRating = () => {
        let result = 0;
        performanceReviews.forEach((rev) => {
            result = result + Number(rev.rating);
        })
        result = result / performanceReviews.length;
        return result;
    }
    const averageRating = calculateAverageRating();

    return (
        <div className="flex-1 p-6 bg-white shadow-md rounded-lg mt-6 border border-neutral-100">
            <div className="flex flex-col gap-6 sm:flex-row items-center transition-all overflow-auto justify-center min-h-full">
                <div className="sm:flex-1 flex flex-col items-center gap-2">
                    <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden">
                        <img
                            src="https://github.com/shadcn.png"
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h2 className="text-2xl font-bold">{performanceReviews[0].name}</h2>
                    <p className="text-lg text-gray-500 text-center">{performanceReviews[0].job_title}</p>
                    <p className="text-md text-gray-600 text-center"><span className='font-semibold'>Department: </span>{performanceReviews[0].department}</p>
                    <p className="text-sm text-gray-400">Joined: {new Date(performanceReviews[0].start_date).toLocaleDateString()}</p>

                </div>
                <div className='h-px bg-neutral-100 w-full sm:hidden'></div>

                <div className="sm:flex-1 text-center">
                    <div className="flex flex-col items-center justify-center">
                        <p className="text-sm text-gray-500 mb-1">Overall Rating</p>
                        <div className="flex items-center gap-2">
                            <span className="text-4xl font-bold text-gray-800">{averageRating}</span>
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-6 h-6 ${i < Math.floor(averageRating)
                                            ? 'text-yellow-500 fill-yellow-500'
                                            : 'text-gray-300'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="text-lg font-semibold text-gray-600 mt-2">
                        Total Reviews: {performanceReviews.length}
                    </div>
                    <div className="text-sm text-gray-400 mt-1">
                        Last Reviewed: {new Date(performanceReviews[0].reviewed_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                        })}
                    </div>
                    <div className="mt-4 text-gray-700 text-sm italic">
                        "{performanceReviews[0].feedback}"
                    </div>
                    <div className="text-sm text-gray-400 mt-2">
                        <span className='font-semibold'>Latest Achieved Goals: </span>{performanceReviews[0].goals_achieved}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerformanceReviewCard;
