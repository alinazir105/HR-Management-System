import React, { useEffect, useState, useCallback } from 'react'
import NotificationButton from './NotificationButton'
import NotificationList from './NotificationList'
import { disconnectSocket, listenForNotifications } from '@/lib/socketService';
import api from '@/lib/api';
import { toast } from 'sonner';

const Notifications = ({ isLoggedIn }) => {
    const [notifications, setNotifications] = useState([]);
    const [isOpen, setIsOpen] = useState(false)

    const fetchNotifications = useCallback(async () => {
        if (isLoggedIn) {
            try {
                const response = await api.get("/notifications", { withCredentials: true });
                setNotifications(response.data.notifications)

            } catch {
                console.error("Error fetching notifications")
                toast.error("Error fetching notifications")
            }

        }
    }, [isLoggedIn]);

    useEffect(() => {
        fetchNotifications();

        const handleNewNotification = (notification) => {
            setNotifications((prevNotifications) => [
                ...prevNotifications,
                notification,
            ]);
        };

        listenForNotifications(handleNewNotification);

        return () => {
            disconnectSocket();
        }
    }, [fetchNotifications]);

    return (
        <>
            <div className='relative'>
                <NotificationButton setIsOpen={setIsOpen} notifications={notifications} />
                {isOpen && <NotificationList notifications={notifications} setNotifications={setNotifications} />}
            </div>
        </>
    )
}

export default Notifications;
