import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Calendar, CheckCircle, Mail, User } from 'lucide-react'
import React, { useState } from 'react'

const CandidateCard = ({ candidate }) => {
    const [showResume, setShowResume] = useState(false);

    const toggleResume = () => {
        setShowResume(!showResume);
    };

    const progressColor =
        candidate.match_score_percentage <= 33
            ? '[&>div]:bg-red-500 bg-gray-200'
            : candidate.match_score_percentage <= 67
                ? '[&>div]:bg-yellow-500 bg-gray-200'
                : '[&>div]:bg-green-600 bg-gray-200'

    return (
        <div className="col-span-full">
            <Card className="flex flex-col shadow-md border rounded-lg p-4 pb-5 w-full hover:shadow-lg transition-all">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle className="text-xl font-semibold">{candidate.name}</CardTitle>
                            {candidate.email && (
                                <div className="flex items-center text-sm text-muted-foreground mt-1">
                                    <Mail className="h-4 w-4 mr-1" />
                                    {candidate.email}
                                </div>
                            )}
                        </div>
                        <Badge variant="outline" className="text-xs">{candidate.status}</Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-3">
                        <div className='flex justify-between items-center text-xs text-muted-foreground'>
                            <div className="flex items-center text-sm text-muted-foreground">
                                <User className="h-5 w-5 mr-1 text-primary" />
                                <p className="font-medium">Match Score</p>
                            </div>
                            <div className="flex items-center">
                                <CheckCircle className="h-4 w-4 mr-1 text-success" />
                                <p className=''>{candidate.match_score_percentage}%</p>
                            </div>
                        </div>

                        <Progress value={candidate.match_score_percentage} className={`h-2 ${progressColor}`} />
                        <div className="flex justify-between items-center text-xs text-muted-foreground mt-2">
                            <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1 text-primary" />
                                <p>Applied on: {new Date(candidate.applied_at).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                    <div className='space-y-1.5'>

                        <Button
                            onClick={toggleResume}
                            variant={"outline"}
                            className="mt-4 px-6 py-2 text-sm font-semibold rounded-md w-full cursor-pointer transition-all"
                        >
                            {showResume ? "Hide Resume" : "Show Resume"}
                        </Button>

                        {showResume && candidate.resume_text && (
                            <div className="bg-muted/50 border border-border shadow-sm rounded-xl p-6 flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-semibold text-primary">Candidate Resume</h3>
                                </div>
                                <div className="border-t pt-2 text-sm leading-6 text-muted-foreground whitespace-pre-line">
                                    {candidate.resume_text}
                                </div>
                            </div>
                        )}
                    </div>

                    <Button className="w-full mt-1 cursor-pointer  text-white hover:text-white border-none font-semibold transition-all">Hire</Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default CandidateCard
