import React, { useEffect, useState } from 'react'
import LeaveRequestsHeader from './LeaveRequestsHeader'
import LeaveRequestsTable from './LeaveRequestsTable'
import api from '@/lib/api'
import { toast } from 'sonner'
import LoadingScreen from '@/components/ui/LoadingScreen'


const LeaveRequests = () => {
  const [allLeaves, setAllLeaves] = useState([])
  const [refreshData, setRefreshData] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchAllMyLeaves() {
      let response;
      setIsLoading(true)
      try {
        response = await api.get("/leaves/my-all", { withCredentials: true });
        setAllLeaves(response.data.leaves);
      } catch (e) {
        console.error(e);

        toast.error(response.data.message)
      }
      finally {
        setIsLoading(false)
      }
    }
    fetchAllMyLeaves()
    setRefreshData(false)
  }, [refreshData])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className='ml-10 mt-2 mr-8'>
      <LeaveRequestsHeader setRefreshData={setRefreshData} />
      <LeaveRequestsTable allLeaves={allLeaves} setRefreshData={setRefreshData} />
    </div>
  )
}

export default LeaveRequests
