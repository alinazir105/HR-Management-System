import React, { useEffect, useState } from 'react'
import RecruitmentHeader from './RecruitmentHeader'
import RecruitmentTable from './RecruitmentTable'
import { toast } from 'sonner'
import api from '@/lib/api'
import LoadingScreen from '@/components/ui/LoadingScreen'

const Recruitment = () => {
    const [allJobs, setAllJobs] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [refresh, setRefresh] = useState(false)
    const [searchedJob, setSearchedJob] = useState("")
    const [filteredJobs, setFilteredJobs] = useState([])
    const [statusFilter, setStatusFilter] = useState("all");


    useEffect(() => {
        const fetchAllJobs = async () => {
            setIsLoading(true)
            try {
                const response = await api.get("/recruitment/all-jobs", { withCredentials: true })
                setAllJobs(response.data.allJobs)

            } catch (e) {
                console.error(e);
                toast.error(e?.response.data.message || "Error")
            }
            finally {
                setIsLoading(false)
            }
        }
        fetchAllJobs()
        setRefresh(false)
    }, [refresh])

    useEffect(() => {
        let filtered = allJobs;

        if (searchedJob) {
            filtered = filtered.filter((job) =>
                job.title.toLowerCase().includes(searchedJob.toLowerCase())
            );
        }

        if (statusFilter === "active") {
            filtered = filtered.filter((job) => job.openings > 0);
        } else if (statusFilter === "closed") {
            filtered = filtered.filter((job) => job.openings == 0);
        }

        setFilteredJobs(filtered);
    }, [searchedJob, allJobs, statusFilter]);

    if (isLoading || refresh) {
        return <LoadingScreen />
    }


    return (
        <div className='content'>
            <RecruitmentHeader setRefresh={setRefresh} searchedJob={searchedJob} setSearchedJob={setSearchedJob} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
            <RecruitmentTable allJobs={filteredJobs} setRefresh={setRefresh} refresh={refresh} />
        </div>
    )
}

export default Recruitment
