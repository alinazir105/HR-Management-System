import { Button } from '@/components/ui/button'
import React from 'react'
import NotificationItem from './NotificationItem'
import api from '@/lib/api'
import { toast } from 'sonner'

const NotificationList = ({ notifications, setNotifications }) => {

    async function handleClearAll() {
        const notificationIds = notifications.map((notif) => notif.id);
        if (notificationIds.length == 0) {
            toast.error("No notifications to clear!")
        }
        try {
            await api.put("/notifications/clear-all", { notificationIds })

            setNotifications([])
        } catch {
            console.error("Error updating notification");
        }
    }

    return (
        <div className={`absolute z-50 shadow-xl bg-gray-100 py-2 px-2 right-7 w-[28em] rounded-md pb-2 max-h-[40em] overflow-y-auto`}>
            <div className='border-b pb-2 flex items-center justify-between px-5'>
                <h1 className='font-semibold'>Notifications</h1>
                <div>
                    <Button onClick={handleClearAll} variant="ghost" className={"font-semibold hover:bg-transparent cursor-pointer hover:underline text-blue-600 hover:text-blue-600 p-0"}>Clear All</Button>
                </div>
            </div>
            <div>
                {notifications.length > 0 ? <>
                    {notifications.map((notif, index) => {
                        return <NotificationItem key={index} notification={notif} setNotifications={setNotifications} />
                    })}

                </> :
                    <div className='text-center h-full flex justify-center items-center min-h-[6em]'><p>No new notifications</p></div>}
            </div>
        </div>
    )
}

export default NotificationList
