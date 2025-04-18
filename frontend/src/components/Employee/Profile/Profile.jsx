import React, { useEffect, useState } from 'react'
import ProfileHeader from './ProfileHeader'
import ProfileEditableForm from './ProfileEditableForm'
import ProfileReadOnlyForm from './ProfileReadOnlyForm'
import api from '@/lib/api'
import { toast } from 'sonner'
import LoadingScreen from '@/components/ui/LoadingScreen'

const Profile = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [employeeData, setEmployeeData] = useState({})

    useEffect(() => {
        async function fetchEmployeeDetails() {
            let response = null;
            try {
                setIsLoading(true);
                response = await api.get("/profile/me", { withCredentials: true });
                if (response != null && Object.keys(response.data.employeeData).length > 0) {
                    setEmployeeData(response.data.employeeData);
                } else {
                    toast.error("No data found! Please try again later!");
                }
            } catch (e) {
                console.error(e);
                toast.error(response.data.message)
            }
            finally {
                setIsLoading(false)
            }
        }
        fetchEmployeeDetails()
    }, [])

    if (isLoading) {
        return <LoadingScreen />
    }


    return (
        <div className='content'>
            <ProfileHeader />
            <div className='flex flex-col gap-8 lg:flex-row mt-10 text-center lg:gap-12 border border-neutral-200 p-8 px-10 py-10 rounded-lg'>
                <ProfileEditableForm data={employeeData} />
                <div className='w-full h-px bg-neutral-200 lg:hidden'></div>
                <ProfileReadOnlyForm data={employeeData} />
            </div>
        </div>
    )
}

export default Profile
