import { Bell } from 'lucide-react'
import React, { forwardRef } from 'react'
import NotificationBadge from './NotificationBadge'

const NotificationButton = forwardRef(({ setIsOpen, notifications }, ref) => {
    return (
        <div className='relative'>
            <div ref={ref} className='relative w-11 h-11 rounded-[50%]  mr-4 flex justify-center items-center hover:bg-gray-200 transition-all cursor-pointer mb-1' onClick={() => { setIsOpen((prev) => !prev) }}>
                <Bell width={21} height={21} />
                {notifications.length > 0 && <NotificationBadge />}
            </div>
        </div>

    )
});

export default NotificationButton
