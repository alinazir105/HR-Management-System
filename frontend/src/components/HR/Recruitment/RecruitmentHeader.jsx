import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'
import RecruitmentJobAdd from './RecruitmentJobAdd'

const RecruitmentHeader = () => {
    return (
        <div className='flex flex-wrap mt-5 justify-between items-end'>
            <h1 className='text-3xl font-bold'>Recruitment Portal</h1>
            <div>
                <RecruitmentJobAdd />
            </div>
        </div>
    )
}

export default RecruitmentHeader
