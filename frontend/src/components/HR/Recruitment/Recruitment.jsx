import React, { useEffect, useState } from 'react'
import RecruitmentHeader from './RecruitmentHeader'
import RecruitmentTable from './RecruitmentTable'

const Recruitment = () => {
    const [allJobs, setAllJobs] = useState([])

    useEffect(() => {

    }, [])


    return (
        <div className='content'>
            <RecruitmentHeader />
            <RecruitmentTable />
        </div>
    )
}

export default Recruitment
