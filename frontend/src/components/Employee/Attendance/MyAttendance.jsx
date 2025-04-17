import React, { useCallback, useEffect, useState } from 'react'
import MyAttendanceCard from './MyAttendanceCard'
import MyAttendanceTable from './MyAttendanceTable'
import api from '@/lib/api';
import { toast } from 'sonner';
import LoadingScreen from '@/components/ui/LoadingScreen';

const MyAttendance = () => {
    const [allAttendance, setAllAttendance] = useState([])
    const [refetch, setRefetch] = useState(false)
    const [isFetching, setIsFetching] = useState(true)

    const fetchAllAttendance = useCallback(async () => {
        console.log("Fetching All Attendance");

        setIsFetching(true)
        try {
            const response = await api.get('/attendance/my-all', { withCredentials: true })
            setAllAttendance(response.data.attendance)
        } catch (error) {
            console.error("Error fetching all attendances", error)
            toast.error(error?.response?.data?.message || "Failed to fetch attendance.")
        } finally {
            setIsFetching(false)
        }
    }, [])

    useEffect(() => {
        fetchAllAttendance()
    }, [fetchAllAttendance, refetch])

    if (isFetching) {
        return <LoadingScreen />
    }

    return (
        <div className='content'>
            <MyAttendanceCard setRefetch={setRefetch} setIsFetching={setIsFetching} />
            <MyAttendanceTable allAttendance={allAttendance} />
        </div>
    )
}

export default MyAttendance
