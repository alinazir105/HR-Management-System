import { Button } from '@/components/ui/button'
import React from 'react'

const LeaveRequestsHeader = () => {
  return (
    <div className='flex justify-between gap-5 flex-wrap mt-4'>
      <h1 className='text-3xl font-bold'>Leave Requests</h1>
      <div>
        <Button variant={"outline"} className={"cursor-pointer"}>
          Apply for leave
        </Button>
      </div>
    </div>
  )
}

export default LeaveRequestsHeader
