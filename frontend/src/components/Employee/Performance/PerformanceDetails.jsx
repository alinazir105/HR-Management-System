import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    CalendarDays,
    UserCircle,
    Star,
    MessageSquareText,
    Target,
    CheckCircle2,
    AlertTriangle,
    Paperclip,
} from 'lucide-react';
import { RefreshCw } from 'lucide-react';

const PerformanceDetails = ({ performanceReviews }) => {
    return (
        <Card className="mt-6 border border-neutral-100 shadow-md">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">
                    Detailed Reviews
                </CardTitle>
            </CardHeader>

            <CardContent>
                <Accordion type="multiple">
                    {performanceReviews.map((review, index) => (
                        <AccordionItem
                            value={review.id}
                            key={review.id}
                            className="border-t border-neutral-100"
                        >
                            <AccordionTrigger className="hover:no-underline py-3 cursor-pointer hover:bg-neutral-50 px-5">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full text-left gap-8">
                                    <div className="space-y-0.5">
                                        <p className="inline-flex items-center justify-center mb-2 px-3 py-1 text-sm text-white font-semibold bg-blue-600 rounded-full">
                                            Review {index + 1}
                                        </p>

                                        <p className="text-base text-gray-600">
                                            <span className="inline-flex items-center gap-1 font-semibold">
                                                <CalendarDays className="w-4 h-4" />
                                                Review Period:
                                            </span>{' '}
                                            {review.period}
                                        </p>
                                        <p className="text-base text-gray-700">
                                            <span className="inline-flex items-center gap-1 font-semibold">
                                                <UserCircle className="w-4 h-4" />
                                                Reviewer:
                                            </span>{' '}
                                            {review.reviewer}
                                        </p>
                                        <p className="text-base text-gray-700">
                                            <span className="inline-flex items-center gap-1 font-semibold">
                                                <Star className="w-4 h-4" />
                                                Rating:
                                            </span>{' '}
                                            {review.rating} / 5
                                        </p>
                                        <p className="text-base text-gray-600 line-clamp-1">
                                            <span className="inline-flex items-center gap-1 font-semibold">
                                                <MessageSquareText className="w-4 h-4" />
                                                Feedback:
                                            </span>{' '}
                                            {review.feedback}
                                        </p>
                                    </div>
                                    <div className="mt-2 sm:mt-0">
                                        <Badge variant="outline" className="text-base inline-flex items-center gap-1">
                                            <RefreshCw className="w-4 h-4" />
                                            {review.status}
                                        </Badge>
                                    </div>
                                </div>
                            </AccordionTrigger>


                            <AccordionContent className="text-base text-gray-800 px-7 pb-4">
                                <div className="mt-3">
                                    <p className="font-semibold mb-1 inline-flex items-center gap-1">
                                        <MessageSquareText className="w-4 h-4" />
                                        Full Feedback
                                    </p>
                                    <p className="text-gray-700">{review.feedback}</p>
                                </div>
                                <div className="mt-2">
                                    <p className="font-semibold mb-1 inline-flex items-center gap-1">
                                        <Target className="w-4 h-4" />
                                        Goals Set
                                    </p>
                                    <ul className="list-disc list-inside text-gray-700">
                                        {review.goals_set.map((goal, idx) => (
                                            <li key={idx}>{goal}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-3">
                                    <p className="font-semibold mb-1 inline-flex items-center gap-1">
                                        <CheckCircle2 className="w-4 h-4" />
                                        Goals Achieved
                                    </p>
                                    <ul className="list-disc list-inside text-gray-700">
                                        {review.goals_achieved.map((goal, idx) => (
                                            <li key={idx}>{goal}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-3">
                                    <p className="font-semibold mb-1 inline-flex items-center gap-1">
                                        <AlertTriangle className="w-4 h-4" />
                                        Areas to Improve
                                    </p>
                                    <ul className="list-disc list-inside text-gray-700">
                                        {review.areas_to_improve.map((area, idx) => (
                                            <li key={idx}>{area}</li>
                                        ))}
                                    </ul>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>
    );
};

export default PerformanceDetails;
