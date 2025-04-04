import { Button } from '@/components/ui/button'
import api from '@/lib/api'
import { Check, Info, Megaphone, SquareCheck } from 'lucide-react'
import React, { useState } from 'react'



const NotificationItem = ({ notification, setNotifications }) => {
    const [showFullDescription, setShowFullDescription] = useState(false)

    const calculateTimePassed = () => {
        const notificationTime = new Date(notification.created_at);
        const currentTime = new Date();
        const timeDiffMs = currentTime - notificationTime;

        const timeDiffMinutes = timeDiffMs / (1000 * 60);
        const timeDiffHours = timeDiffMs / (1000 * 60 * 60);
        const timeDiffDays = timeDiffMs / (1000 * 60 * 60 * 24);

        if (timeDiffMinutes < 60) {
            return `${Math.floor(timeDiffMinutes)} min ago`;
        } else if (timeDiffHours < 24) {
            return `${Math.floor(timeDiffHours)} hr ago`;
        } else {
            return `${Math.floor(timeDiffDays)} days ago`;
        }
    }

    async function handleMarkAsReadClick() {
        console.log("clocked");
        try {
            await api.put("/notifications/mark-as-read", { notification_id: notification.id })
            setNotifications((prevNotifications) => {
                return prevNotifications.filter((notif) => notif.id !== notification.id)
            })
        } catch {
            console.error("Error updating notification");
        }
    }

    return (
        <div className='border border-neutral-100 rounded-sm p-2 flex items-center justify-between mt-1'>
            <div className='flex gap-4 max-w-[60%]'>
                <div>
                    {notification.title.includes("task") ? <SquareCheck width={28} height={28} /> : notification.title.includes("announcement") ? <Megaphone width={28} height={28} /> : <Info width={28} height={28} />}
                </div>
                <div className='break-words whitespace-normal max-w-full overflow-hidden'>
                    <div className='flex gap-2 items-center mb-1 flex-wrap'>
                        <h2 className='font-semibold'>{notification.title}</h2>
                        <div className='w-1 h-1 bg-gray-400 rounded-[50%] mt-1'></div>
                        <p className='text-neutral-500 text-sm'>{calculateTimePassed()}</p>
                    </div>
                    <div
                        className={`${showFullDescription ? "max-h-full" : "max-h-20"
                            } overflow-hidden transition-all duration-300`}
                    >
                        <p className='text-gray-600'>
                            {notification?.description || ""}
                        </p>
                    </div>
                    {!showFullDescription && notification?.description?.length > 60 && (
                        <button
                            className="text-blue-600 font-semibold cursor-pointer hover:underline"
                            onClick={() => setShowFullDescription(true)}
                        >
                            View More
                        </button>
                    )}
                    {showFullDescription && notification?.description?.length > 60 && (
                        <button
                            className="text-blue-600 font-semibold cursor-pointer hover:underline"
                            onClick={() => setShowFullDescription(false)}
                        >
                            View Less
                        </button>
                    )}
                </div>
            </div>
            <div>

                <Button onClick={handleMarkAsReadClick} className={"bg-blue-600 text-white font-semibold px-2 cursor-pointer hover:bg-blue-700"}>Mark as read</Button>
            </div>
        </div>
    )
}

export default NotificationItem
