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
        if (!searchedJob) {
            setFilteredJobs(allJobs)
        } else {
            const filtered = allJobs.filter((job) =>
                job.title.toLowerCase().includes(searchedJob.toLowerCase())
            )
            setFilteredJobs(filtered)
        }
    }, [searchedJob, allJobs])

    if (isLoading || refresh) {
        return <LoadingScreen />
    }


    return (
        <div className='content'>
            <RecruitmentHeader setRefresh={setRefresh} searchedJob={searchedJob} setSearchedJob={setSearchedJob} />
            <RecruitmentTable allJobs={filteredJobs} setRefresh={setRefresh} />
        </div>
    )
}

export default Recruitment
