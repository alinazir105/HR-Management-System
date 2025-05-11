import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Calendar, CheckCircle, Eye, Loader2, Mail, User } from 'lucide-react'
import api from '@/lib/api'
import { Wrench, Briefcase, Clock, MapPin, CalendarDays, Users } from 'lucide-react'
import CandidateCard from './CandidateCard'
import JobViewCard from './JobViewCard'

const RecruitmentJobView = ({ job, setRefresh, refresh }) => {
    const [open, setOpen] = useState(false)
    const [candidates, setCandidates] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchJobAndCandidates = async () => {
            if (!open || !job?.id) return;
            setIsLoading(true)
            try {
                const response = await api.get(`/recruitment/job-view/${job.id}`, { withCredentials: true })
                setCandidates(response.data.jobView)
            } catch (e) {
                console.error(e)
            } finally {
                setIsLoading(false)
            }
        }
        fetchJobAndCandidates()
    }, [open, job, refresh])

    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger asChild>
                <Button variant="outline" className={"cursor-pointer"}>
                    <Eye />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-7xl pt-10 max-h-[90vh] overflow-y-auto pb-5">
                {isLoading ? (
                    <div className="flex justify-center items-center h-60">
                        <Loader2 className="animate-spin" />
                    </div>
                ) : (
                    <div className="space-y-4">
                        <JobViewCard job={job} />

                        <Separator />

                        <div className="w-full">
                            <h3 className="text-xl font-semibold mb-3 text-center">Candidates Applied</h3>
                            {candidates.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                                    {candidates.map(candidate => (
                                        <CandidateCard candidate={candidate} job={job} key={candidate.id} setRefresh={setRefresh} />
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
