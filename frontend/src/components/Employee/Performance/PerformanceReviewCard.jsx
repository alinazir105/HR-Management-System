import { Star } from 'lucide-react';
import React from 'react';

const PerformanceReviewCard = () => {
    return (
        <div className="flex-1 p-6 bg-white shadow-md rounded-lg mt-6 border border-neutral-100">
            <div className="flex flex-col gap-6 sm:flex-row items-center 2xl:mt-5 transition-all">
                {/* Left Section: Profile Info */}
                <div className="sm:flex-1 flex flex-col items-center gap-2">
                    <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden">
                        <img
                            src="https://github.com/shadcn.png"
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h2 className="text-2xl font-bold">Ahmed Ali</h2>
                    <p className="text-lg text-gray-500">Software Engineer</p>
                    <p className="text-md text-gray-600"><span className='font-semibold'>Department: </span>Engineering</p>
                    <p className="text-sm text-gray-400">Joined: Jan 2022</p>
                </div>
                <div className='h-px bg-neutral-100 w-full sm:hidden'></div>

                {/* Right Section: Performance Info */}
                <div className="sm:flex-1 text-center">
                    <div className="flex flex-col items-center justify-center">
                        <p className="text-sm text-gray-500 mb-1">Overall Rating</p>
                        <div className="flex items-center gap-2">
                            <span className="text-4xl font-bold text-gray-800">4.3</span>
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-6 h-6 ${i < 4 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="text-lg font-semibold text-gray-600 mt-2">
                        Total Reviews: 6
                    </div>
                    <div className="text-sm text-gray-400 mt-1">
                        Last Reviewed: March 2025
                    </div>
                    <div className="text-sm text-gray-400 mt-2">
                        Next Review: July 2025
                    </div>
                    <div className="mt-4 text-gray-700 text-sm italic">
                        "Excellent problem-solving skills. Needs improvement in communication."
                    </div>
                    <div className="text-sm text-gray-400 mt-2">
                        Goals: Improve communication, Complete project A
                    </div>
                    <div className="text-sm text-blue-600 mt-3 cursor-pointer">
                        View Detailed Review
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerformanceReviewCard;
