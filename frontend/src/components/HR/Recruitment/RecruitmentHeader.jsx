import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'
import RecruitmentJobAdd from './RecruitmentJobAdd'
import { Input } from "@/components/ui/input"

const RecruitmentHeader = ({ setRefresh, searchedJob, setSearchedJob }) => {
    return (
        <div className='flex flex-wrap mt-5 justify-between items-end gap-3'>
            <h1 className='text-3xl font-bold'>Recruitment Portal</h1>
            <div className='flex gap-2 flex-wrap sm:flex-nowrap'>
                <Input placeholder="Search via Job Title" className={"max-w-[20em] sm:w-[20em]"} value={searchedJob} onChange={(e) => { setSearchedJob(e.target.value) }} />
                <RecruitmentJobAdd setRefresh={setRefresh} />
            </div>
        </div>
    )
}

export default RecruitmentHeader
