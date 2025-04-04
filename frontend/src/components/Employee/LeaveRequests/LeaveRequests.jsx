import React, { useEffect, useState } from 'react'
import LeaveRequestsHeader from './LeaveRequestsHeader'
import LeaveRequestsTable from './LeaveRequestsTable'
import api from '@/lib/api'
import { toast } from 'sonner'


const LeaveRequests = () => {
  const [allLeaves, setAllLeaves] = useState([])

  useEffect(() => {
    async function fetchAllMyLeaves() {
      let response;
      try {
        response = await api.get("/leaves/my-all", { withCredentials: true });
        setAllLeaves(response.data.leaves);
      } catch {
        toast.error(response.data.message)
      }
    }
    fetchAllMyLeaves()
  }, [])

  return (
    <div className='ml-10 mt-2 mr-8'>
      <LeaveRequestsHeader />
      <LeaveRequestsTable allLeaves={allLeaves} />
    </div>
  )
}

export default LeaveRequests
