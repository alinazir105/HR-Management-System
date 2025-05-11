import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Briefcase, CalendarDays, Clock, MapPin, Users, Wrench } from 'lucide-react'
import React from 'react'

const JobViewCard = ({ job }) => {
    return (
        <Card className="p-6">
            <CardHeader className="space-y-2">
                <CardTitle className="text-3xl font-bold text-primary">{job.title}</CardTitle>
                <p className="text-muted-foreground text-base leading-relaxed">{job.description}</p>
            </CardHeader>

            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-muted-foreground">
                <div className="space-y-4">
                    {job.skills_required && (
                        <div className="flex items-start gap-3">
                            <Wrench className="h-5 w-5 text-primary mt-1" />
                            <div>
                                <p className="font-semibold text-primary">Skills Required</p>
                                <p>{job.skills_required}</p>
                            </div>
                        </div>
                    )}
                    {job.experience_required !== null && (
                        <div className="flex items-start gap-3">
                            <Briefcase className="h-5 w-5 text-primary mt-1" />
                            <div>
                                <p className="font-semibold text-primary">Experience Required</p>
                                <p>{job.experience_required} year(s)</p>
                            </div>
                        </div>
                    )}
                    {job.job_type && (
                        <div className="flex items-start gap-3">
                            <Clock className="h-5 w-5 text-primary mt-1" />
                            <div>
                                <p className="font-semibold text-primary">Job Type</p>
                                <p>{job.job_type}</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    {job.location && (
                        <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-primary mt-1" />
                            <div>
                                <p className="font-semibold text-primary">Location</p>
                                <p>{job.location}</p>
                            </div>
                        </div>
                    )}
                    {job.deadline && (
                        <div className="flex items-start gap-3">
                            <CalendarDays className="h-5 w-5 text-primary mt-1" />
                            <div>
                                <p className="font-semibold text-primary">Deadline</p>
                                <p>{new Date(job.deadline).toLocaleDateString()}</p>
                            </div>
                        </div>
                    )}
                    {job.openings !== null && (
                        <div className="flex items-start gap-3">
                            <Users className="h-5 w-5 text-primary mt-1" />
                            <div>
                                <p className="font-semibold text-primary">Openings</p>
                                <p>{job.openings}</p>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

export default JobViewCard
