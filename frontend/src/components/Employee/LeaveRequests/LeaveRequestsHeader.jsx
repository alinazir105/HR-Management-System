import { Button } from '@/components/ui/button'
import React from 'react'
import LeaveRequestDialog from './LeaveRequestDialog'

const LeaveRequestsHeader = ({ setRefreshData }) => {
  return (
    <div className='flex justify-between gap-5 flex-wrap mt-4'>
      <h1 className='text-3xl font-bold'>Leave Requests</h1>
      <div>
        <LeaveRequestDialog setRefreshData={setRefreshData} />
      </div>
    </div>
  )
}

export default LeaveRequestsHeader
