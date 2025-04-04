import React, { useEffect, useState } from 'react'
import MyAttendanceCard from './MyAttendanceCard'
import MyAttendanceTable from './MyAttendanceTable'
import api from '@/lib/api';
import { toast } from 'sonner';

const MyAttendance = () => {
    const [allAttendance, setAllAttendance] = useState([])
    const [refetch, setRefetch] = useState(false)

    useEffect(() => {
        const fetchAllAttendance = async () => {
            let response;
            try {
                response = await api.get('/attendance/my-all', { withCredentials: true });
                setAllAttendance(response.data.attendance)
            } catch {
                console.error("Error fetching all attendances");
                toast.error(response.data.message)
            }
        };

        fetchAllAttendance();
        setRefetch(false)
    }, [refetch]);

    return (
        <div className='ml-10 mt-2 mr-8'>
            <MyAttendanceCard setRefetch={setRefetch} />
            <MyAttendanceTable allAttendance={allAttendance} />
        </div>
    )
}

export default MyAttendance
