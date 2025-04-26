import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'
import RecruitmentJobAdd from './RecruitmentJobAdd'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const RecruitmentHeader = ({ setRefresh, searchedJob, setSearchedJob, statusFilter, setStatusFilter }) => {
    return (
        <div className='flex flex-wrap mt-5 justify-between items-end gap-3'>
            <h1 className='text-3xl font-bold'>Recruitment Portal</h1>
            <div className='flex gap-2 flex-wrap lg:flex-nowrap'>
                <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                </Select>
                <Input placeholder="Search via Job Title" className={"max-w-[20em] sm:w-[20em]"} value={searchedJob} onChange={(e) => { setSearchedJob(e.target.value) }} />
                <RecruitmentJobAdd setRefresh={setRefresh} />
            </div>
        </div>
    )
}

export default RecruitmentHeader
