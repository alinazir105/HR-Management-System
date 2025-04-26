import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Loader2 } from 'lucide-react'
import api from '@/lib/api'
import { Wrench, Briefcase, Clock, MapPin, CalendarDays, Users } from 'lucide-react'

const RecruitmentJobView = ({ job }) => {
    const [open, setOpen] = useState(false)
    const [candidates, setCandidates] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchJobAndCandidates = async () => {
            if (!open || !job?.id) return;
            setIsLoading(true)
            try {
                const response = await api.get(`/recruitment/job-view/${job.id}`, { withCredentials: true })
                setCandidates(response.data.candidates)
            } catch (e) {
                console.error(e)
            } finally {
                setIsLoading(false)
            }
        }
        fetchJobAndCandidates()
    }, [open, job])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">View</Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl pt-10 max-h-[90vh] overflow-y-auto pb-10">
                {isLoading ? (
                    <div className="flex justify-center items-center h-60">
                        <Loader2 className="animate-spin" />
                    </div>
                ) : (
                    <div className="space-y-4">
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



                        <Separator />

                        <div>
                            <h3 className="text-xl font-semibold mb-2">Candidates Applied</h3>
                            {candidates.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {candidates.map(candidate => (
                                        <Card key={candidate.id} className="flex flex-col justify-between">
                                            <CardHeader>
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <CardTitle className="text-lg">Candidate ID: {candidate.candidate_id}</CardTitle>
                                                        <p className="text-xs text-muted-foreground mt-1">
                                                            Applied At: {new Date(candidate.applied_at).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    <Badge variant="outline" className="text-xs">{candidate.status}</Badge>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="space-y-2">
                                                <div className="text-sm">
                                                    <p className="font-medium">Match Score:</p>
                                                    <Progress value={candidate.match_score_percentage} className="h-2 mt-1" />
                                                    <p className="text-xs text-muted-foreground mt-1">
                                                        {candidate.match_score_percentage}%
                                                    </p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">No candidates have applied yet.</p>
                            )}
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default RecruitmentJobView
